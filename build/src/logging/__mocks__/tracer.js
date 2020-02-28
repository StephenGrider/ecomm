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
var opentracing_1 = require("opentracing");
var Tracer = /** @class */ (function (_super) {
    __extends(Tracer, _super);
    function Tracer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startSpan = jest.fn();
        _this.inject = jest.fn();
        _this.extract = jest.fn();
        _this.spanFromRequest = jest
            .fn()
            .mockReturnValue({ log: jest.fn(), finish: jest.fn() });
        _this.spanFromEvent = jest
            .fn()
            .mockReturnValue({ log: jest.fn(), finish: jest.fn() });
        _this.injectEvent = jest.fn().mockImplementation(function (span, context) {
            context['context'] = { context: 1 };
        });
        return _this;
    }
    return Tracer;
}(opentracing_1.Tracer));
exports.tracer = new Tracer();
