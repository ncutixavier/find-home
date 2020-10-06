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

    it('it should create new user', (done) => {
        const user = {
            "name": "Jane Doe",
            "email": "janedoe@gmail.com",
            "phone": "+250788888888",
            "role": "landlord",
            "gender": "Female",
            "birthdate": "1981-11-08",
            "password": "@#EW23ER@#arsrREffTR5d5ddsdg"
        }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object')
                expect(res.body).to.be.an('object').with.property('user')
                done();
            });
    })

    it('it should GET all users', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object')
                expect(res.body).to.be.an('object').with.property('users')
                done();
            });
    })
});