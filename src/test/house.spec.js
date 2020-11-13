import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../app'
import mocks from './mocks/mocks'

chai.use(chaiHttp)
const expect = chai.expect;

describe('PHANTOM API - HOUSE', () => {

    //GET BY ID
    it('should not get house by id when id not found', (done) => {
        let id = 123
        chai.request(server)
            .get('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    })

    it('should not get house by id when id is invalid', (done) => {
        let id = '1dddd'
        chai.request(server)
            .get('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    })

    it('should get all houses', (done) => {
        chai.request(server)
            .get('/api/v1/houses/view')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('should get houses', (done) => {
        chai.request(server)
            .get('/api/v1/houses')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('should get houses', (done) => {
        chai.request(server)
            .get('/api/v1/houses?page=1&limit=undefined')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
    })

    it('should not get houses due to page not found', (done) => {
        chai.request(server)
            .get('/api/v1/houses?page=5&limit=10')
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    })

    //Add New House
    it('should add new house', (done) => {
        chai.request(server)
            .post('/api/v1/houses/')
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .send(mocks.updateHouse)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                done();
            });
    })

    //Add new comment
    it('should not add new comment', (done) => {
        chai.request(server)
            .post('/api/v1/houses/1/createComment')
            .set('Authorization', `Bearer ${mocks.tokens.client}`)
            .send({"comment":"Comment..."})
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

     //Add New House
     it('should not add new house due to validation', (done) => {
        chai.request(server)
            .post('/api/v1/houses/')
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .send(mocks.notAddHouse)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    })

    //UPDATE HOUSE
    it('should update house', (done) => {
        let id = 2
        chai.request(server)
            .patch('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .send(mocks.updateHouse)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    it('should get house by id', (done) => {
        let id = 1
        chai.request(server)
            .get('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.admin}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

    //DELETE HOUSES
    it('should not delete house due to not house owner', (done) => {
        let id = 1
        chai.request(server)
            .delete('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    })

    it('should delete house', (done) => {
        let id = 2
        chai.request(server)
            .delete('/api/v1/houses/' + id)
            .set('Authorization', `Bearer ${mocks.tokens.landlord}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    })

})