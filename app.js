require('dotenv').config()
const express = require('express')
const app = express();
const cookieparser = require('cookie-parser')
const ratelimit = require('./middleware/ratelimit')
const expressLayout=require("express-ejs-layouts");
const errorHandler = require('./middleware/errorHandler');


app.use(ratelimit)
const PORT = 3000

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler)

app.set('views', __dirname + '/views');
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})