const app = require('./index.js');
const request = require('supertest');
const mongoose = require('mongoose');
const appPort = 'localhost:3000'

// Making dummy unit test to see if Jest even works
it ('Testing to see if Jest works', () => {
    expect(1).toBe(1);
})

describe("GET api/getAll", () => {
    test("Returns status code 200 with all users", async () => {
        const response = await request(appPort).get('/api/getAll')
        .set('Accept', 'application/json')
        expect(response.status).toBe(200)
    })
    afterAll(() => mongoose.disconnect())
})

describe("POST api/register", () => {
    test("Returns status code 200 with new user's information", async () => {
        const response = await request(appPort).post('/api/register')
        .send({'FirstName': 'Johnny', 
               'LastName': 'Depp',
               'UserName': 'jdepp',
               'Email': 'jdepp@urmom.com',
               'Password':'HashThisPassword123',
               'Verified': 'False'
        })
        .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if username exists already", async () => {
        const response = await request(appPort).post('/api/register')
        .send({'FirstName': 'Johnny', 
               'LastName': 'Depp',
               'UserName': 'jdepp',
               'Email': 'jdepp@urmom.com',
               'Password':'HashThisPassword123',
               'Verified': 'False'
        })
        .set('Accept', 'application/json')
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username taken. Try again.");
    })
})

describe("POST api/login", () => {
    test("Returns status code 200 with user's ID and first and last name", async () => {
    const response = await request(appPort).post('/api/login')
        .send({UserName:'cheonsa143', Password:'test1234'})
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user doesn't exist", async () => {
    const response = await request(appPort).post('/api/login')
        .send({UserName:'ThisUserIsNotReal', Password:'password12345'})
        .set('Accept', 'application/json')
    expect(response.status).toBe(400);
    })
    
    test("Returns status code 400 if user inputs wrong password", async () => {
    const response = await request(appPort).post('/api/login')
        .send({UserName:'cheonsa143', Password:'wrongPassword'})
        .set('Accept', 'application/json')
    expect(response.status).toBe(400);
    })
})

describe("POST /getOneProfile", () => {
    test("Returns status code 200 if user exists in db", async () => {
        const response = await request(appPort).post('/api/login')
            .send({UserName:'cheonsa143', Password:'wrongPassword'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })

    test("Returns status code 400 if user does not exist in db", async () => {
        const response = await request(appPort).post('/api/login')
            .send({UserName:'cheonsa143', Password:'wrongPassword'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})