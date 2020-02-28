"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
var events_1 = require("events");
var broker_1 = require("events/broker");
var tracer_1 = require("logging/tracer");
jest.mock('logging/tracer');
var createBroker = function () {
    var client = node_nats_streaming_1.default.connect('clsuterId', 'clientId', { url: 'url' });
    var _process = new events_1.EventEmitter();
    var broker = new broker_1.Broker(_process, tracer_1.tracer);
    broker.setClient(client);
    return {
        tracer: tracer_1.tracer,
        client: client,
        _process: _process,
        broker: broker
    };
};
var createUserCreatedEvent = function () {
    return {
        data: {
            id: '1',
            role: 'user',
            email: 'asdf@asdf.com'
        },
        metadata: {
            type: 'user-created',
            id: '1',
            timestamp: '1'
        },
        context: {}
    };
};
beforeEach(function () {
    jest.clearAllMocks();
});
it('the client losing a connection throws an error', function () {
    var _a = createBroker(), broker = _a.broker, client = _a.client;
    expect(function () {
        client.emit('connection_lost');
    }).toThrow();
});
it('when the process emits SIGUSR2 the client closes', function () {
    var _a = createBroker(), broker = _a.broker, client = _a.client, _process = _a._process;
    expect(function () {
        _process.emit('SIGUSR2');
    }).toThrow();
    expect(client.close).toHaveBeenCalled();
});
describe('publishing', function () {
    it('can publish an event', function () {
        var _a = createBroker(), broker = _a.broker, client = _a.client;
        var event = createUserCreatedEvent();
        broker.publish(event);
        expect(client.publish).toHaveBeenCalled();
        // @ts-ignore
        var _b = client.publish.mock.calls[0], subject = _b[0], data = _b[1];
        expect(subject).toEqual('user-created');
        expect(data).toEqual(JSON.stringify(event));
    });
    it('when publishing, it starts a span', function () {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var event = createUserCreatedEvent();
        broker.publish(event);
        expect(tracer.spanFromRequest).toHaveBeenCalledWith('user-created', undefined);
    });
    it('if given some context, it will start the span with context', function () {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var event = createUserCreatedEvent();
        // @ts-ignore
        broker.publish(event, {});
        expect(tracer.spanFromRequest).toHaveBeenCalledWith('user-created', {});
    });
    it('injects context into the event', function () {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var event = createUserCreatedEvent();
        broker.publish(event);
        expect(event.context).toEqual({ context: 1 });
    });
    it('logs the entire event', function () {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var event = createUserCreatedEvent();
        broker.publish(event);
        //@ts-ignore
        var span = tracer.spanFromRequest();
        expect(span.log).toHaveBeenCalledWith({ event: event });
    });
    it('resolves on successful publish', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, broker, client, tracer, event, promise, span, guid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
                    event = createUserCreatedEvent();
                    promise = broker.publish(event);
                    //@ts-ignore
                    client.publish.mock.calls[0][2](null, 'guid');
                    span = tracer.spanFromRequest();
                    return [4 /*yield*/, promise];
                case 1:
                    guid = _b.sent();
                    expect(guid).toEqual('guid');
                    expect(span.log).toHaveBeenCalledWith({ guid: 'guid' });
                    expect(span.finish).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on unsuccessful publish', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, broker, client, tracer, event, promise, span, err, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
                    event = createUserCreatedEvent();
                    promise = broker.publish(event);
                    //@ts-ignore
                    client.publish.mock.calls[0][2]('error message', null);
                    span = tracer.spanFromRequest();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promise];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    err = error_1;
                    return [3 /*break*/, 4];
                case 4:
                    expect(err).toEqual('error message');
                    expect(span.log).not.toHaveBeenCalledWith({ guid: 'guid' });
                    expect(span.log).toHaveBeenCalledWith({ error: 'error message' });
                    expect(span.finish).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('handling', function () {
    it('should be able to receive fully decoded messages', function (done) {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var event = createUserCreatedEvent();
        broker.on('user-created', function (data, message) {
            expect(data).toEqual(event);
            expect(message.getSubject()).toEqual('user-created');
            done();
        });
        var message = {
            getSubject: jest.fn().mockReturnValue('user-created'),
            getData: jest.fn().mockReturnValue(JSON.stringify(event))
        };
        // @ts-ignore
        client.subscribe().on.mock.calls[0][1](message);
    }, 200);
    it('should enforce some types', function (done) {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var _event = createUserCreatedEvent();
        broker.on('user-created', function (event, message) {
            expect(event).toEqual(_event);
            expect(message.getSubject()).toEqual('user-created');
            // This is really a check to make sure TS picks up correct typings
            expect(event.data.email).toBeDefined();
            expect(event.data.id).toBeDefined();
            expect(event.data.role).toBeDefined();
            done();
        });
        var message = {
            getSubject: jest.fn().mockReturnValue('user-created'),
            getData: jest.fn().mockReturnValue(JSON.stringify(_event))
        };
        // @ts-ignore
        client.subscribe().on.mock.calls[0][1](message);
    }, 200);
    it('creates and finishes a span', function (done) {
        var _a = createBroker(), broker = _a.broker, client = _a.client, tracer = _a.tracer;
        var _event = createUserCreatedEvent();
        broker.on('user-created', function (event, message) {
            expect(event).toEqual(_event);
            expect(message.getSubject()).toEqual('user-created');
            //@ts-ignore
            var span = tracer.spanFromEvent();
            expect(span.log).toHaveBeenCalled();
            setImmediate(function () {
                expect(span.finish).toHaveBeenCalled();
                done();
            });
        });
        var message = {
            getSubject: jest.fn().mockReturnValue('user-created'),
            getData: jest.fn().mockReturnValue(JSON.stringify(_event))
        };
        // @ts-ignore
        client.subscribe().on.mock.calls[0][1](message);
    }, 200);
});
