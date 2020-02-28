"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var errors_1 = require("../errors");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof errors_1.NotFoundError ||
        err instanceof errors_1.BadRequestError ||
        err instanceof errors_1.RequestValidationError ||
        err instanceof errors_1.NotAuthorizedError) {
        var _a = err.handleResponse(), code = _a.code, errors = _a.errors;
        return res.status(code).json(errors);
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        var errors = [];
        for (var key in err.errors) {
            errors.push({
                field: key,
                message: err.errors[key].message
            });
        }
        return res.status(400).json({
            errors: errors
        });
    }
    console.error('UnhandledError', err);
    res.status(500).json({
        errors: [{ message: 'Server Error' }]
    });
};
