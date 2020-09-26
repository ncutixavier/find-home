import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'

chai.use(chaiHttp)
const expect = chai.expect;

describe('FIND HOME API', () => {
    describe('/GET Welcome', () => {
        it('it should GET welcome', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('/GET Users', () => {
        it('it should GET all users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').with.property('users')
                    done();
                });
        });

        it('it should NOT GET all users', (done) => {
            chai.request(server)
                .get('/api/v1/user')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

});
