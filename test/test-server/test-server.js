const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const _server = require('./test-server-helpers.js');
const Server = new _server();

describe('Server', () => {
    before(() => Server.run());
    after(() => Server.close());
    
    it('test', () => {
        (2).should.equal(2);
    });
})