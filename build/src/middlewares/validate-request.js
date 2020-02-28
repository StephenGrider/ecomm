"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var errors_1 = require("../errors");
exports.validateRequest = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new errors_1.RequestValidationError(errors.array());
    }
    next();
};
