'use strict';
module.exports = class Server {
    constructor() {
        const { PORT, DATABASE_URL } = require('../../config/config');
        this.PORT = PORT;
        this.DATABASE_URL = DATABASE_URL;
        this.knex = require('knex')(this.DATABASE_URL);
        this.server;
        this.app = require('express')();
    }
    
    run() {
        return new Promise((resolve, reject) => {
            try {
                this.server = this.app.listen(this.PORT, () => {
                    console.info(`App listening on port ${this.server.address().port}`);
                    resolve();
                });
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
};
