"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
exports.requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new errors_1.NotAuthorizedError();
    }
    next();
};
