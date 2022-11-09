const app = require('../../index');
const request = require('supertest');
const port = 'http://localhost:3000'

describe("GET api/getAll", () => {
    test("Returns status code 200 with all users", async () => {
    const response = await request(port).get('/api/getAll')
    .set('Accept', 'application/json')
    //expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    })
})

describe("POST api/register", () => {
    test("Returns status code 200 with new user's information", async () => {
        const response = await request(port).post('/api/register')
        .send({'FirstName': 'John', 'LastName': 'Doe', 'UserName': 'johndoe', 'Email': 'johndoe@urmom.com', 'Password':'HashThisPassword'})
        .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if username exists already", async () => {
        const response = await request(port).post('/api/register')
        .send({'FirstName': 'John', 'LastName': 'Doe', 'UserName': 'johndoe', 'Email': 'johndoe@urmom.com', 'Password':'HashThisPassword'})
        .set('Accept', 'application/json')
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username taken. Try again.");
    })
})

describe("POST api/login", () => {
    test("Returns status code 200 with user's ID and first and last name", async () => {
    const response = await request(app)
      .post('/api/login')
      .send({UserName:'cheonsa143', Password:'test1234'})
      .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    })

    test("Returns status code 400 if user doesn't exist", async () => {
    const response = await request(app)
      .post('/api/login')
      .send({UserName:'ThisUserIsNotReal', Password:'password12345'})
      .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    })
    
    test("Returns status code 400 if user doesn't exist", async () => {
    const response = await request(app)
      .post('/api/login')
      .send({UserName:'cheonsa143', Password:'wrongPassword'})
      .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    })
})