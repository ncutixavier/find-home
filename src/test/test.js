import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'

chai.use(chaiHttp)
const expect = chai.expect;

describe('FIND HOME API', () => {
    it('it should GET welcome', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('it should handle unspecified route', (done) => {
        chai.request(server)
            .get('/ghyy')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('it should register user', (done) => {
        const users = {
            "name": "J. Smith",
            "email": "jsmith@gmail.com",
            "phone": "+250788888888",
            "role": "client",
            "gender": "Female",
            "birthdate": "1981-01-01",
            "password": "#utyGFFGt6ds6wg"
        }
        chai.request(server)
            .post('/api/v1/users/signup')
            .send(users)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object')
                done();
            });
    })


    it('it should not register user when not filled out', (done) => {
        const users = {
            "name": "Jane Doe",
            "role": "landlord",
            "gender": "Female",
            "birthdate": "1981-11-08"
        }
        chai.request(server)
            .post('/api/v1/users/signup')
            .send(users)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    })

    it('it should not register user when email exist', (done) => {
        const users = {
            "name": "Jane Doe",
            "email": "ncuti65@gmail.com",
            "phone": "+250788888888",
            "role": "landlord",
            "gender": "Female",
            "birthdate": "1981-11-08"
        }
        chai.request(server)
            .post('/api/v1/users/signup')
            .send(users)
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(err).to.not.exist
                done();
            });
    })

    it('it should login with a valid credentials', (done) => {
        const user = {
            "email": "ncuti65@gmail.com",
            "password": "pf4ziB5w"
        }
        chai.request(server)
            .post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object').with.property('token')
                done();
            });
    })

    it('it should not login without valid credentials', (done) => {
        const user = {
            "email": "ncuti65@gmail.com",
            "password": "pass1234"
        }
        chai.request(server)
            .post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    })

    it('it should DELETE user', (done) => {
        let id = 1
        chai.request(server)
            .delete('/api/v1/users/' + id)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('it should NOT DELETE user due to invalid ID', (done) => {
        let id = 'ewewr12gsfa'
        chai.request(server)
            .delete('/api/v1/users/' + id)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    })

    it('it should NOT DELETE user due to ID not found', (done) => {
        let id = '12'
        chai.request(server)
            .delete('/api/v1/users/' + id)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    })
});