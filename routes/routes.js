const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/HomeController')
const User = require('../models/users')



const addUserMiddleware = (req, res, next) => {
    console.log('Middleware executed');
    next()
}

router.get('/', dashboard.index)
// router.get('/upload', dashboard.uploadFile)

// router.post('/profile', function (req, res, next) {
    
//     res.send('File uploaded successfully!');
// })


router.get('/add', dashboard.addUserForm)
router.post('/add_user', addUserMiddleware, dashboard.addUser)

router.post('/update', dashboard.update)
router.get('/delete/:id', dashboard.delete)
router.get('/edit/:id', dashboard.edit)

module.exports = router;