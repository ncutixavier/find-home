import chaiHttp from'chai-http'
import server from'../app'
import chai from 'chai'


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