class apiError extends Error {
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.success = false,
        this.errors = errors

        if(statck) {
            this.stack = statck  
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export { apiError }