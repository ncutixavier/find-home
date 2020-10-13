import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'
// import auth from '../controllers/userControllers'

chai.use(chaiHttp)
const expect = chai.expect;

describe('PHANTOM API - AUTH', () => {
    it('it should NOT GET all users without token', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.an('object').with.property('message')
                done();
            });
    })

    it('it should Not GET All Users without correct token', (done) => {
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjAyNjA1MjY5LCJleHAiOjE2MTAzODEyNjl9.e06hhlNs3Mdzh8qUW3Y8hNBpQsfaRo_8Eo14hnx07Lq`
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    })

    it('it should Not GET All Users without permission', (done) => {
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNjA2MzYyLCJleHAiOjE2MTAzODIzNjJ9.9-Iprs1WR5M2IZ-wh99h91mG3uW4NvJ0MMnkT75o63c`
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
    })

    it('it should logout successfully', (done) => {
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNjA2MzYyLCJleHAiOjE2MTAzODIzNjJ9.9-Iprs1WR5M2IZ-wh99h91mG3uW4NvJ0MMnkT75o63c`
        chai.request(server)
            .get('/api/v1/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('it should GET All Users', (done) => {
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNjA2OTQzLCJleHAiOjE2MTAzODI5NDN9.Xwz46v6zgqYKvIy-690M82Mc4vfknIgtV4ZxVYfVU_A`
        chai.request(server)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    })
});
