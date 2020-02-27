"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.connect = function (url) {
        return mongoose_1.default.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };
    Client.prototype.close = function () {
        return mongoose_1.default.connection.close();
    };
    return Client;
}());
var client = new Client();
exports.client = client;
