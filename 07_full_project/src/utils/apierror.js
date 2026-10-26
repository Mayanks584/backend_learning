/*

yaha pe hum apne api errors ko standartise karege

*/

class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {

        // here we override code 

        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message

        this.success = false;
        this.errors = errors



        if (stack) {
            this.stack = stack

        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }


    }
}

export { ApiError }

/*
 
kya mainn api ki req resp ki bhi class bna sakta hu ? 

*/