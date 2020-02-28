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
var events_1 = require("events");
var Subscription = /** @class */ (function (_super) {
    __extends(Subscription, _super);
    function Subscription() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close = jest.fn();
        _this.unsubscribe = jest.fn();
        _this.closed = false;
        return _this;
    }
    Subscription.prototype.isClosed = function () {
        return this.closed;
    };
    return Subscription;
}(events_1.EventEmitter));
var StanMock = /** @class */ (function (_super) {
    __extends(StanMock, _super);
    function StanMock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subscriptionOptions = jest.fn().mockReturnValue({
            setStartWithLastReceived: jest
                .fn()
                .mockReturnValue({ start: 'last_received ' })
        });
        _this.close = jest.fn().mockReturnValue(function () { return new Subscription(); });
        _this.publish = jest.fn();
        _this.subscribe = jest.fn().mockReturnValue({
            on: jest.fn()
        });
        return _this;
    }
    return StanMock;
}(events_1.EventEmitter));
exports.default = {
    connect: function () {
        return new StanMock();
    }
};
