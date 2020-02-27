"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockBroker = /** @class */ (function () {
    function MockBroker() {
        this.client = {
            //@ts-ignore
            publish: jest.fn()
        };
    }
    return MockBroker;
}());
exports.broker = new MockBroker();
