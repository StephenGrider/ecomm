import nats from 'node-nats-streaming';
declare class Broker {
    private _client;
    get client(): nats.Stan;
    onConnect(): void;
    connect(clusterId: string, clientId: string, serverUrl: string): Promise<unknown>;
}
declare const broker: Broker;
export { broker };
