import mongoose from 'mongoose';
declare class Client {
    connect(url: string): Promise<typeof mongoose>;
    close(): Promise<void>;
}
declare const client: Client;
export { client };
