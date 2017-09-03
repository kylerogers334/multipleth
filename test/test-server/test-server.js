const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const helpers = require('./test-server-helpers.js');
const Server = new helpers.Server;
const app = Server.app;

describe('Server', () => {
    before(function() { Server.run() });
    after(function() { Server.close() });
    
    describe('get server', function() {
        it('should get /', function() {
            return chai.request(app)
                .get('/')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.html;
                });
        });
    });
    
    describe('get /api/age', function() {
        it('should get /api/age/state', function() {
            return chai.request(app)
                .get('/api/age/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'median_age');
                });
        });
        
        it('should get /api/age/county', function() {
            return chai.request(app)
                .get('/api/age/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'median_age');
                });
        });
    });
    
    describe('get /api/asian', function() {
        it('should get /api/asian/state', function() {
            return chai.request(app)
                .get('/api/asian/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'asian');
                });
        });
        
        it('should get /api/asian/county', function() {
            return chai.request(app)
                .get('/api/asian/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'asian');
                });
        });
    });
    
    describe('get /api/black', function() {
        it('should get /api/black/state', function() {
            return chai.request(app)
                .get('/api/black/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'black');
                });
        });
        
        it('should get /api/black/county', function() {
            return chai.request(app)
                .get('/api/black/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'black');
                });
        });
    });
    
    describe('get /api/crime', function() {
        it('should get /api/crime/state', function() {
            return chai.request(app)
                .get('/api/crime/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'rate');
                });
        });
        
        it('should get /api/crime/county', function() {
            return chai.request(app)
                .get('/api/crime/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'rate');
                });
        });
    });
    
    describe('get /api/education', function() {
        it('should get /api/education/state', function() {
            return chai.request(app)
                .get('/api/education/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'percent_bach_degree');
                });
        });
        
        it('should get /api/education/county', function() {
            return chai.request(app)
                .get('/api/education/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'percent_bach_degree');
                });
        });
    });
    
    describe('get /api/election', function() {
        it('should get /api/election/state', function() {
            return chai.request(app)
                .get('/api/election/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'winner');
                });
        });
        
        it('should get /api/election/county', function() {
            return chai.request(app)
                .get('/api/election/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'winner');
                });
        });
    });
    
    describe('get /api/housing', function() {
        it('should get /api/housing/state', function() {
            return chai.request(app)
                .get('/api/housing/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'median_cost');
                });
        });
        
        it('should get /api/housing/county', function() {
            return chai.request(app)
                .get('/api/housing/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'median_cost');
                });
        });
    });
    
    describe('get /api/income', function() {
        it('should get /api/income/state', function() {
            return chai.request(app)
                .get('/api/income/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'median_income');
                });
        });
        
        it('should get /api/income/county', function() {
            return chai.request(app)
                .get('/api/income/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'median_income');
                });
        });
    });
    
    describe('get /api/latino', function() {
        it('should get /api/latino/state', function() {
            return chai.request(app)
                .get('/api/latino/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'latino');
                });
        });
        
        it('should get /api/latino/county', function() {
            return chai.request(app)
                .get('/api/latino/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'latino');
                });
        });
    });
    
    describe('get /api/population', function() {
        it('should get /api/population/state', function() {
            return chai.request(app)
                .get('/api/population/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'population');
                });
        });
        
        it('should get /api/population/county', function() {
            return chai.request(app)
                .get('/api/population/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'population');
                });
        });
    });
    
    describe('get /api/rent', function() {
        it('should get /api/rent/state', function() {
            return chai.request(app)
                .get('/api/rent/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'median_rent');
                });
        });
        
        it('should get /api/rent/county', function() {
            return chai.request(app)
                .get('/api/rent/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'median_rent');
                });
        });
    });
    
    describe('get /api/unemployment', function() {
        it('should get /api/unemployment/state', function() {
            return chai.request(app)
                .get('/api/unemployment/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'rate');
                });
        });
        
        it('should get /api/unemployment/county', function() {
            return chai.request(app)
                .get('/api/unemployment/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'rate');
                });
        });
    });
    
    describe('get /api/white', function() {
        it('should get /api/white/state', function() {
            return chai.request(app)
                .get('/api/white/state')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('name', 'white');
                });
        });
        
        it('should get /api/white/county', function() {
            return chai.request(app)
                .get('/api/white/county/01')
                .then(function(res) {
                    res.body.length.should.be.at.least(1);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.all.keys('fips', 'white');
                });
        });
    });
})