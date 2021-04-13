import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(router);
    this.server.listen(process.env.PORT || 3333);
  }
}

export default new App().server;
