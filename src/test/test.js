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

    describe('/all Welcome', () => {
        it('it should handle unspecified route', (done) => {
            chai.request(server)
                .get('/ghyy')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });
    });

    // describe('/GET Users', () => {
    //     it('it should GET all users', (done) => {
    //         chai.request(server)
    //             .get('/api/v1/users')
    //             .end((err, res) => {
    //                 expect(res.statusCode).to.equal(200);
    //                 expect(res.body).to.be.an('object')
    //                 expect(res.body).to.be.an('object').with.property('users')
    //                 done();
    //             });
    //     })
    // });

    // describe('/GET Users By ID', () => {
    //     it('it should GET user by id', (done) => {
    //         let id = 2
    //         chai.request(server)
    //             .get(`/api/v1/users/${id}`)
    //             .end((err, res) => {
    //                 expect(res.statusCode).to.equal(200);
    //                 expect(res.body).to.be.an('object')
    //                 expect(res.body).to.be.an('object').with.property('user')
    //                 done();
    //             });
    //     })
    // });
});
