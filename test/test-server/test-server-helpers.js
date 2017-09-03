'use strict';
module.exports =  {
    Server: class Server {
        constructor() {
            const { PORT, DATABASE_URL } = require('../../config/config');
            const { app, server } = require('../../server/server');
            this.PORT = PORT;
            this.DATABASE_URL = DATABASE_URL;
            this.knex = require('knex')(this.DATABASE_URL);
            this.app = app;
            this.server = server;
        }
        
        run() {
            return new Promise((resolve, reject) => {
                try {
                    resolve();
                }
                catch (err) {
                    console.error(`Can't start server: ${err}`);
                    reject(err);
                }
            });
        }
        
        close() {
            return this.knex.destroy().then(() => {
                return new Promise((resolve, reject) => {
                    console.log('Closing servers');
                    this.server.close(err => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
          });
        }
    }
};
