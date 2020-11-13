import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'
import mocks from './mocks/mocks'

chai.use(chaiHttp)
const expect = chai.expect;

describe('Phantom API - VALIDATION TEST', () => {
    it('it should not login with an invalid email', (done) => {
        chai.request(server)
            .post('/api/v1/users/login')
            .send(mocks.invalidEmail)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object').with.property('message')
                done();
            });
    })

    // it('it should not login when email not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/login')
    //         .send(mocks.EmailNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object').with.property('message')
    //             done();
    //         });
    // })

    // it('it should not login when password not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/login')
    //         .send(mocks.PasswordNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object').with.property('message')
    //             done();
    //         });
    // })
    
    it('it should not register user when name is not provided', (done) => {
        chai.request(server)
            .post('/api/v1/users/signup')
            .send(mocks.nameNotFound)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object')
                done();
            });
    })

    // it('it should not register user when phone is not complete', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.phoneNotComplete)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when phone is not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.phoneNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when email is not valid', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.EmailNotValid)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when email is not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.EmailNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when gender is not valid', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.GenderNotValid)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when gender is not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.GenderNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when birthdate is not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.BirthdateNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when role is not valid', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.RoleNotValid)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })

    // it('it should not register user when role is not provided', (done) => {
    //     chai.request(server)
    //         .post('/api/v1/users/signup')
    //         .send(mocks.RoleNotFound)
    //         .end((err, res) => {
    //             expect(res.statusCode).to.equal(400);
    //             expect(res.body).to.be.an('object')
    //             done();
    //         });
    // })
});
