const express = require("express");
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const oncontrollerAdress = require('./controller/controllerAdress');

routes.post("/adress/create", celebrate({
    [Segments.BODY]: Joi.object().keys({
        cep: Joi.number().required(),
        district: Joi.string().required(),
        municipality: Joi.string().required(),
        public_place: Joi.string().required()
    })
}), oncontrollerAdress.create);
routes.get('/adress/index', oncontrollerAdress.index);
routes.delete('/adress/delete/:id', oncontrollerAdress.delete);

module.exports = routes;
