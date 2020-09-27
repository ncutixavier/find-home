"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swagger = _interopRequireDefault(require("./../swagger.json"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _welcomeRoutes = _interopRequireDefault(require("./routes/welcomeRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import userRoutes from './routes/userRoutes'
// import AppError from './utils/AppError'
// import GlobalErrorHandler from './controllers/errorControllers'
// "clean": "mkdir build",
//     "build-server": "babel -d ./build ./src -s",
//         "build": "npm run clean && npm run build-server",
var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); // app.use('/api/v1/users', userRoutes)

app.use('/', _welcomeRoutes["default"]);
app.all('*', function (req, res, next) {
  // next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
  res.status(404).json({
    status: 'fail',
    message: "can't find ".concat(req.originalUrl, " on this server")
  });
}); // app.use(GlobalErrorHandler)

var _default = app;
exports["default"] = _default;