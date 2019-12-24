const request = require('supertest');
const expect = require('chai').expect;
const knex = require("../db/knex");
const app = require('../app');

describe('lesson grud', () => {
    before((done) => {
        knex.migrate.latest()
        .then(() => {
            return knex.seed.run()
        }).then(() => done())
    });

    it('List all Record  ', (done) =>{
        request(app)
            .get('/api/v1/stickers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                done();
            })
    })

    it('show one Record by id  ', (done) => {
        request(app)
            .get('/api/v1/stickers/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                done();
            })
    })

    it('add new sticker to database', (done) => {
        request(app)
            .get('/api/v1/stickers/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                done();
            })
    })
})