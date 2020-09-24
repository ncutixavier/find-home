const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')

// //Assertion style
chai.should()
chai.use(chaiHttp)

describe('FIND HOME API', () => {
    /*
      * Test the /GET route
      */
    describe('/GET Welcome', () => {
        it('it should GET welcome', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
