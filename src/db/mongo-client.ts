import mongoose from 'mongoose';

class MongoClient {
  static connect(url: string) {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  static close() {
    return mongoose.connection.close();
  }
}

export { MongoClient };
