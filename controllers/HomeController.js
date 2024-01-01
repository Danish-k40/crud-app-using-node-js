const User = require('../models/users')
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = path.extname(file.originalname).toLowerCase();
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
    }
})
const upload = multer({ storage: storage })

exports.index = async (req, res) => {
  const users = await User.find({})
  console.log(users);
  res.render('index', { title: "Home Page", users })
}

exports.addUserForm = async (req, res) => {
  res.render('add', { title: "Add User" })
}

exports.addUser = async (req, res) => {
  try {
      upload.single('image')(req, res, async (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Error uploading file.');
          }

          const { name, email, phone } = req.body;
          const imagePath = req.file ? 'uploads/' + req.file.filename : null; // Construct the image path

          await User.create({
              name: name,
              email: email,
              phone: phone,
              image: imagePath,
          });

          res.redirect('/');
      });
  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
  }
};


exports.delete = async (req, res) => {
  const userId = req.params.id;

  await User.deleteOne({ _id: userId })
  res.redirect('/');
}

exports.edit = async (req, res) => {

  const userId = req.params.id

  const user = await User.findById(userId);
  res.render('edit', { title: "Edit", user })

}


exports.update = async (req, res) => {

  const { name, email, phone, id } = req.body;

  await User.updateMany({ _id: id }, { name: name, email: email, phone: phone })
  res.redirect('/');

}

exports.uploadFile = async(req, res) => {
  res.render('uploads')
}