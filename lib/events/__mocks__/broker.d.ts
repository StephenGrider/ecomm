/// <reference types="jest" />
declare class MockBroker {
    client: {
        publish: jest.Mock<any, any>;
    };
}
export declare const broker: MockBroker;
export {};
