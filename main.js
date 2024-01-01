// imports
require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');
const session = require('express-session');
const User = require('./models/users');
const app = express();
const PORT = process.env.PORT || 4000;

//database connection

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("connected to database"))
app.use(express.static('uploads'))

// middlewares

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: "My secret Key",
    saveUninitialized: true,
    resave: false,
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

//set template engin

app.set('view engine', 'ejs');

app.use("", require("./routes/routes"))
// app.get('/', (req, res) => {
//     res.send('sdfgopdfg')
// })


app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})