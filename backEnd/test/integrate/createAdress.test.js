const supertest = require('supertest');
const mocha = require('./mocha.json')
const assert = require('assert')
const app = require('../../src/index')

describe('POST /ADRESS', () => {
    it('Should create a new adress', (done) => {
        supertest(app)
            .post('/adress/create').send({
                "cep": 12345678,
                "district": "vila-alta",
                "municipality": "crato",
                "public_place": "rua feitosa"
            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                assert(response.body.cep, 12345678)
                assert(response.body.district, "vila-alta")
                assert(response.body.municipality, "crato")
                assert(response.body.public_place, "rua feitosa")
                done();
            })
            .catch(err => done(err))
    });

    it('Should return error create a new adress', (done) => {
        supertest(app)
            .post('/adress/create').send({
                "cep": 12345678,
                "district": "vila-alta",
                "public_place": "rua feitosa"
            })
            .set('Accept', 'application/json')
            .expect(400).then(response => {
                assert(response.body.statusCode, 400)
                assert(response.body.error, "Bad Request")
                done();
            })
            .catch(err => done(err))
    });
});

describe('GET /ADRESS', () => {
    it('Should fetch an array of address', (done) => {
        supertest(app)
            .get('/adress/index')
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                assert.ok(Array.isArray(response.body))
                assert(response.body[0].cep, 12345678)
                assert(response.body[0].district, "vila-alta")
                assert(response.body[0].municipality, "crato")
                assert(response.body[0].public_place, "rua feitosa")
                done();
            })
            .catch(err => done(err))
    });
});

describe('DELETE /ADRESS', () => {
    it('Should delete an address', (done) => {
        supertest(app)
            .delete(`/adress/delete/24`)
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                assert(response.status, 200)
                assert(response.ok, true)
                done();
            })
            .catch(err => done(err))
    });
    it('Should give error when deleting address not found', (done) => {
        supertest(app)
            .delete(`/adress/delete/`)
            .set('Accept', 'application/json')
            .expect(404).then(response => {
                assert(response.status, 404)
                done();
            })
            .catch(err => done(err))
    });
});