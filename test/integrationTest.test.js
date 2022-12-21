const request = require('supertest')
const { Author } = require('../models/author')
let server

describe('api/authors',() => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        //await Author.remove({})
    });

describe('GET /', () => {
    it('should return all authors', async () => {
        await Author.collection.insertMany([
            {name: 'Willy Vandersteen', dateOfBirth: '15/01/1914'},
            {name: 'Merho', dateOfBirth: '27/03/1944'}
        ]);

        const res = await request(server).get('/api/authors');

        expect(res.status).toBe(200)
        expect(res.body.length).toBe(2);
        expect(res.body.some(author => author.name === 'Willy Vandersteen')).toBeTruthy();
        expect(res.body.some(author => author.name === 'Merho')).toBeTruthy();
        expect(res.body.some(author => author.name === 'Michael Wieland')).not.toBeTruthy();
    });
});

describe('GET/:id', () => {
    it('should return one aothor', async () => {
        await Author.collection.insertOne({
            name: 'Willy Vandersteen', dateOfBirth: '15/01/1914'
        });

        const id = newAuthor._id
        console.log(id)

        const res = await request(server).get(`/api/authors/${id}`);

        expect(res.status).toBe(200)
        expect(res.body.length).toBe(1);
        expect(res.body.this(author => author.name === 'Willy Vandersteen')).toBeTruthy();
    })
})

});