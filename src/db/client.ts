import mongoose from 'mongoose';

class Client {
  connect(url: string) {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  close() {
    return mongoose.connection.close();
  }
}

const client = new Client();

export { client };
