require('dotenv').config()
const express = require('express')
const app = express();

const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})