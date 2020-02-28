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
var NotAuthorizedError = /** @class */ (function (_super) {
    __extends(NotAuthorizedError, _super);
    function NotAuthorizedError(message) {
        if (message === void 0) { message = 'Not authorized'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.code = 401;
        return _this;
    }
    NotAuthorizedError.prototype.handleResponse = function () {
        return {
            code: this.code,
            errors: [{ message: this.message }]
        };
    };
    return NotAuthorizedError;
}(base_error_1.BaseError));
exports.NotAuthorizedError = NotAuthorizedError;
