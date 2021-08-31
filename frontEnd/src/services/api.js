import axios from 'axios';

const apiAdress =axios.create({
    baseURL:'http://localhost:3333',
})
const viaCep =axios.create({
    baseURL:'http://viacep.com.br/ws/',
})

export default {apiAdress, viaCep};