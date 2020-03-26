const express = require('express');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController  = require('./controllers/profileController');
const sessionController  = require('./controllers/sessionController');

console.log(ongController);
console.log(incidentController);
const routes = express.Router();


routes.get('/ongs', ongController.getAll);
routes.post('/ongs', ongController.create);
routes.delete('/ongs/:id', ongController.remove);

routes.get('/profile', profileController.getAll);

routes.get('/incidents', incidentController.getAll);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.remove);


routes.post('/sessions', sessionController.create);






module.exports = routes;