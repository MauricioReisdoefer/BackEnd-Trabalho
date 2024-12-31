exports.APIError = class APIError extends Error {
    constructor(message_, status = 500) {
        super(message_); 
        this.status = status;
    }
};

exports.authError = class authorizationError extends exports.APIError {
    constructor(message_, status = 401) {
        super(message_, status);
    }
};

exports.validationError = class validationError extends exports.APIError {
    constructor(message_, field, cause, status = 421) {
        super(message_, status); 
        this.field = field;
        this.cause = cause;
    }
};