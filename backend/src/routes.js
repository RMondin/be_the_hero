const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

console.log(ongController);
console.log(incidentController);
const routes = express.Router();


routes.get('/ongs', ongController.getAll);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);
routes.delete('/ongs/:id', ongController.remove);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.getAll);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), incidentController.getAll);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), incidentController.remove);


routes.post('/sessions', sessionController.create);






module.exports = routes;