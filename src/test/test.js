import chaiHttp from 'chai-http'
import server from '../app'
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
    /*
      * Test the /GET all users
    */
    describe('/GET Users', () => {
        it('it should GET all users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.users.should.be.a('array');
                    done();
                });
        });
    });

});
