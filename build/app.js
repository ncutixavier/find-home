"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swagger = _interopRequireDefault(require("./../swagger.json"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.get('/', function (req, res) {
  res.status(200).send({
    status: 'success',
    message: 'welcome to find home'
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map