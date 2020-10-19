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
                expect(res.statusCode).to.equal(500);
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
            .set('Authorization', `Bearer ${mocks.tokens.client}`)
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

});
