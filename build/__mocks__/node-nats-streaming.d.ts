/// <reference types="jest" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Stan } from 'node-nats-streaming';
declare class StanMock extends EventEmitter implements Stan {
    subscriptionOptions: jest.Mock<any, any>;
    close: jest.Mock<any, any>;
    publish: jest.Mock<any, any>;
    subscribe: jest.Mock<any, any>;
}
declare const _default: {
    connect(): StanMock;
};
export default _default;
