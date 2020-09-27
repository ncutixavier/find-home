"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('FIND HOME API', function () {
  describe('/GET Welcome', function () {
    it('it should GET welcome', function (done) {
      _chai["default"].request(_app["default"]).get('/').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('/all Welcome', function () {
    it('it should handle unspecified route', function (done) {
      _chai["default"].request(_app["default"]).get('/ghyy').end(function (err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  }); // describe('/GET Users', () => {
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