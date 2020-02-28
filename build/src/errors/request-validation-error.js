"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_error_1 = require("./base-error");
var RequestValidationError = /** @class */ (function (_super) {
    __extends(RequestValidationError, _super);
    function RequestValidationError(errors) {
        var _this = _super.call(this, 'Validation Error') || this;
        _this.errors = errors;
        _this.code = 400;
        return _this;
    }
    RequestValidationError.prototype.formatErrors = function () {
        return this.errors.map(function (err) {
            return {
                field: err.param,
                message: err.msg
            };
        });
    };
    RequestValidationError.prototype.handleResponse = function () {
        return {
            code: this.code,
            errors: this.formatErrors()
        };
    };
    return RequestValidationError;
}(base_error_1.BaseError));
exports.RequestValidationError = RequestValidationError;
