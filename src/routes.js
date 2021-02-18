const express = require('express');
const UserController = require('./app/controllers/UserController');
const AddressController = require('./app/controllers/AddressController');
const TechController = require('./app/controllers/TechController');
const ReportController = require('./app/controllers/ReportController');
const AuthController = require('./app/controllers/AuthController');

const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/authenticate', AuthController.authenticate);
routes.post('/forgot_password', AuthController.forgot_password);
routes.post('/reset_password', AuthController.reset_password);

routes.post('/users', authMiddleware, UserController.store);
routes.get('/users', authMiddleware, UserController.index);
routes.delete('/users/:user_id/delete', authMiddleware, UserController.delete);

routes.post('/users/:user_id/addresses', authMiddleware, AddressController.store);
routes.get('/users/:user_id/addresses', authMiddleware, AddressController.index);

routes.post('/users/:user_id/techs', authMiddleware, TechController.store);
routes.get('/users/:user_id/techs', authMiddleware, TechController.index);
routes.delete('/users/:user_id/techs', authMiddleware, TechController.delete);

routes.get('/report', ReportController.show);

module.exports = routes;