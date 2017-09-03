const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const helpers = require('./test-server-helpers.js');
const Server = new helpers.Server;
const app = Server.app;

describe('Server', () => {
    before(() => Server.run());
    after(() => Server.close());
    
    describe('get server', () => {
        it('should get /', function() {
            return chai.request(app)
                .get('/')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.html;
                });
        });
    });
})