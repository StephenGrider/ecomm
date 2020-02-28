import mongoose from 'mongoose';
declare class MongoClient {
    static connect(url: string): Promise<typeof mongoose>;
    static close(): Promise<void>;
}
export { MongoClient };
