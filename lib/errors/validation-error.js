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
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, errors) {
        var _this = _super.call(this, message) || this;
        _this.errors = errors;
        _this.code = 401;
        return _this;
    }
    ValidationError.prototype.formatErrors = function () {
        // return this.errors.map(err => {
        //   const formatted = { message: err.message };
        //   const field = err.dataPath.replace('/', '');
        //   return field ? { ...formatted, field } : formatted;
        // });
        return [];
    };
    ValidationError.prototype.handleResponse = function () {
        return {
            code: this.code,
            errors: this.formatErrors()
        };
    };
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
