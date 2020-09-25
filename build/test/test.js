"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('FIND HOME API', function () {
  /*
    * Test the /GET route
    */
  describe('/GET Welcome', function () {
    it('it should GET welcome', function (done) {
      _chai["default"].request(_app["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});
//# sourceMappingURL=test.js.map