function errorHandler (error, req, res, next) {
    if(error.message == "Cannot read properties of undefined (reading 'split')") {
        console.log("error detected!")
    }
}

module.exports = errorHandler;