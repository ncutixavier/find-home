import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'
import mocks from './mocks/mocks'

chai.use(chaiHttp)
const expect = chai.expect;

describe('PHANTOM API - AUTH', () => {
    it('it should NOT GET all users without token', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    })

    it('it should GET all users', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('it should Not GET All Users without correct token', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${mocks.tokens.incorrect}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    })

    it('it should Not GET All Users without permission', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    })

    it('it should logout successfully', (done) => {
        chai.request(server)
            .get('/api/v1/users/logout')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('It should not forgot password', (done) => {
        const user = {
            "email": "ncuti65gmail.com"
        }
        chai.request(server)
            .post('/api/v1/users/forgotPassword')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('It should forgot password', (done) => {
        const user = {
            "email": "admin@findhome.com"
        }
        chai.request(server)
            .post('/api/v1/users/forgotPassword')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('It should not reset password', (done) => {
        const password = {
            "password": "pass1234",
            "passwordConfirm": "pass1234"
        }
        chai.request(server)
            .patch('/api/v1/users/resetPassword/' + mocks.tokens.resetTokenExpired)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should not reset password', (done) => {
        const password = {
            "password": "pass1234",
            "passwordConfirm": "qwer1234"
        }
        chai.request(server)
            .patch('/api/v1/users/resetPassword/' + mocks.tokens.resetToken)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should reset password', (done) => {
        const password = {
            "password": "pass1234",
            "passwordConfirm": "pass1234"
        }
        chai.request(server)
            .patch('/api/v1/users/resetPassword/' + mocks.tokens.resetToken)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should not update user profile', (done) => {
        const password = {
            "phone": "+232447",
        }
        chai.request(server)
            .patch('/api/v1/users/profile')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should update user profile', (done) => {
        const password = {
            "email": "admin@findhome.com",
            "phone": "+250787876543"
        }
        chai.request(server)
            .patch('/api/v1/users/profile')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('It should not update user profile', (done) => {
        const password = {
            "phone": "+250787876543"
        }
        chai.request(server)
            .patch('/api/v1/users/profile')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .send(password)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

});
