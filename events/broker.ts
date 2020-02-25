const nats = require('node-nats-streaming');

class Broker {
  async connect(clusterId, clientId, serverUri) {
    return new Promise((resolve, reject) => {
      this.client = nats.connect(clusterId, clientId, serverUri);
      this.client.on('connect', () => {
        process.on('SIGUSR2', () => {
          console.log('Killing nats connection');
          this.client.on('close', () => {
            process.exit();
          });
          this.client.close();
        });

        resolve();
      });
      this.client.on('connection_lost', err => {
        throw err;
      });
      this.client.on('error', err => {
        throw err;
      });
    });
  }
}

module.exports = new Broker();
