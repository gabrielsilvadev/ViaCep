const express = require('express');
const cor =require('cors');
const routes= require('./routes');
const {errors} =require('celebrate');


const app = express();
app.use(cor());
app.use(express.json());
app.use(routes);

app.use(errors());

app.listen(3333);

module.exports = app