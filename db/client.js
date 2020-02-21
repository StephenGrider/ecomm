const mongoose = require('mongoose');

class Client {
  connect(url) {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  close() {
    return mongoose.connection.close();
  }
}

module.exports = new Client();
