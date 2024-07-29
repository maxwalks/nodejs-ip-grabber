require('dotenv').config()
const express = require('express')
const app = express();
const expressLayout=require("express-ejs-layouts");

const PORT = 3000

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', __dirname + '/views');
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})