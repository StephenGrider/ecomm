import nats from 'node-nats-streaming';

class Broker {
  private _client: nats.Stan | null = null;

  get client(): nats.Stan {
    if (!this._client) {
      throw new Error('Attempted to access the client before it was ready');
    }

    return this._client;
  }

  onConnect() {
    process.on('SIGUSR2', () => {
      if (!this.client) {
        return;
      }

      console.log('Killing nats connection');
      this.client.on('close', () => {
        process.exit();
      });
      this.client.close();
    });
  }

  async connect(clusterId: string, clientId: string, serverUrl: string) {
    return new Promise((resolve, reject) => {
      this._client = nats.connect(clusterId, clientId, { url: serverUrl });

      this.client.on('connect', () => {
        this.onConnect();
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

const broker = new Broker();

export { broker };
