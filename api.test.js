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
        const response = await request(appPort).post('/api/getOneProfile')
            .send({Query: '63632373c7af5bc4733c110e'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user does not exist in db", async () => {
        const response = await request(appPort).post('/api/getOneProfile')
            .send({Query: '63632373c7af5bc4733ceeee'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})

describe("POST /editProfile", () => {
    test("Returns status code 200 if user exists in db", async () => {
        const response = await request(appPort).post('/api/editProfile')
            .send({ 'NickName': 'Johnny D', 
                    'DietRest': 'None',
                    'FavCuisine': 'German',
                    'FavDrink': 'Long Island Tea',
                    'FavFood':'Schnitzel',
                    'FoodAllerg': 'None',
                    'userId': '6384b475299a4a1b3fa20b0d',
                    'AccountType': 'Personal',
                    'pronouns': 'he/him',
                    'file': '',
                    '_id': '',
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user does not exist in db", async () => {
        const response = await request(appPort).post('/api/editProfile')
            .send({ 'NickName': 'Johnny D', 
                    'DietRest': 'None',
                    'FavCuisine': 'German',
                    'FavDrink': 'Long Island Tea',
                    'FavFood':'Schnitzel',
                    'FoodAllerg': 'None',
                    'userId': '6384b475299a4a1b3fa20mom',
                    'AccountType': 'Personal',
                    'pronouns': 'he/him',
                    'file': '',
                    '_id': '',
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })
})

describe("POST /searchProfiles", () => {
    test("Returns status code 200 if user(s) exist in db", async () => {
        const response = await request(appPort).post('/api/searchProfiles')
            .send({Query: 'rleinecker'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user does not exist in db", async () => {
        const response = await request(appPort).post('/api/searchProfiles')
            .send({Query: 'yoMama'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
}) 

describe("POST /searchPosts", () => {
    test("Returns status code 200 if post exist in db", async () => {
        const response = await request(appPort).post('/api/searchPosts')
            .send({Query: 'spicy'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if post does not exist in db", async () => {
        const response = await request(appPort).post('/api/searchPosts')
            .send({Query: 'noTags'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })

    test("Returns status code 500 if server is down", async () => {
        const response = await request(appPort).post('/api/searchPosts')
            .send({Query: ''})
            .set('Accept', 'application/json')
        expect(response.status).toBe(500);
    })
}) 

describe("POST /editPost", () => {
    test("Returns status code 200 if user and post exists", async () => {
        const response = await request(appPort).post('/api/editPost')
            .send({ 'RecipeID': '', 
                    'PostID': '635729f8a909eb70eca16509',
                    'ProfileID': '6350bacfad0ac0d60ce31e99',
                    'Category': 'Testing recipeID editPost endpoint v2',
                    'file':'https://res.cloudinary.com/dp3rrjhdi/image/upload/v1669215474/ttmjw0mil0dlltsfokmm.jpg',
                    'Caption': 'Changing caption and photo',
                    'Tags': ['And', 'Some', 'Tags']
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user and post do not exist", async () => {
        const response = await request(appPort).post('/api/editPost')
            .send({ 'RecipeID': '', 
                    'PostID': '',
                    'ProfileID': '6350bacfad0ac0d60ce31e99',
                    'Category': 'Testing recipeID editPost endpoint v2',
                    'file':'https://res.cloudinary.com/dp3rrjhdi/image/upload/v1669215474/ttmjw0mil0dlltsfokmm.jpg',
                    'Caption': 'Changing caption and photo',
                    'Tags': ['And', 'Some', 'Tags']
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})

describe("POST /addPost", () => {
    test("Returns status code 200 if user exists", async () => {
        const response = await request(appPort).post('/api/addPost')
            .send({ 'RecipeID': '', 
                    'UserID': '635729f8a909eb70eca16509',
                    'Category': 'Unit testing is fun',
                    'file':'thisImage.png',
                    'Caption': 'New post new caption',
                    'Tags': ['Add', 'Some', 'Tags']
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user does not exist", async () => {
        const response = await request(appPort).post('/api/addPost')
            .send({ 'RecipeID': '6350bacfab0ac0d60ee31e99', 
                    'UserID': '6350bacfad0ac0d60ce31999',
                    'Category': 'Unit testing is fun part 2',
                    'file':'thisImage.png',
                    'Caption': 'Bad post no pass',
                    'Tags': ['Add', 'Some', 'Tags']
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})

describe("POST /deletePost", () => {
    test("Returns status code 200 if user and post exist", async () => {
        const response = await request(appPort).post('/api/deletePost')
            .send({ 'PostID': '635729f8a909eb70eca16509', 
                    'ProfileID': '6350bacfad0ac0d60ce31e99',
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user and post do not exist", async () => {
        const response = await request(appPort).post('/api/deletePost')
            .send({ 'PostID': 'badPostID', 
                    'ProfileID': '6350bacfad0ac0d60ce31e99',
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})

describe("POST /universalSearch", () => {
    test("Returns status code 200 if users exist", async () => {
        const response = await request(appPort).post('/api/universalSearch')
            .send({ 'Query': 'rleinecker' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 200 if posts exist", async () => {
        const response = await request(appPort).post('/api/universalSearch')
            .send({ 'Query': '637720864d72e9cdcdbb1788' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 200 if recipes exist", async () => {
        const response = await request(appPort).post('/api/universalSearch')
            .send({ 'Query': '637720864d72e9cdcdbb1787' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if nothing exists", async () => {
        const response = await request(appPort).post('/api/deletePost')
            .send({ 'Query': 'badSearchQuery' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    })
})

describe("POST /addRecipe", () => {
    test("Returns status code 200 if recipe does not exist yet", async () => {
        const response = await request(appPort).post('/api/addRecipe')
            .send({ 'Ingredients': 'tomato sauce, pasta', 
                    'Name': 'College Pasta',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if recipe already exists", async () => {
        const response = await request(appPort).post('/api/addRecipe')
            .send({ 'Ingredients': 'tomato sauce, pasta', 
                    'Name': 'College Pasta',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})

describe("POST /editRecipe", () => {
    test("Returns status code 200 if recipe exists and is modified", async () => {
        const response = await request(appPort).post('/api/editRecipe')
            .send({ 'Ingredients': 'tomato sauce, pasta, onion', 
                    'Name': 'College Pasta',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if recipe does not exist", async () => {
        const response = await request(appPort).post('/api/editRecipe')
            .send({ 'Ingredients': 'pumpkin puree, pie crust', 
                    'Name': 'College Pastry',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})

describe("POST /deleteRecipe", () => {
    test("Returns status code 200 if recipe exists and is deleted", async () => {
        const response = await request(appPort).post('/api/deleteRecipe')
            .send({ 'RecipeID': '637f186a160a84d6d5f8ae9a' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if recipe does not exist", async () => {
        const response = await request(appPort).post('/api/deleteRecipe')
            .send({ 'RecipeID': 'badRecipeID' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})

describe("POST /getPersonalFeed", () => {
    test("Returns status code 200 if user exists and has posts", async () => {
        const response = await request(appPort).post('/api/getPersonalFeed')
            .send({ 'UserID': '6350bb36ad0ac0d60ce31e9a' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user does not have posts", async () => {
        const response = await request(appPort).post('/api/getPersonalFeed')
            .send({ 'UserID': '636323c8c7af5bc4733c1111' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 

    test("Returns status code 400 if user does not exist", async () => {
        const response = await request(appPort).post('/api/getPersonalFeed')
            .send({ 'UserID': 'badUserID' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})

describe("POST /altGetMainFeed", () => {
    test("Returns status code 200 if user exists and is following people", async () => {
        const response = await request(appPort).post('/api/altGetMainFeed')
            .send({ 'ProfileID': '6350bb36ad0ac0d60ce31e9a' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if user is not following anyone", async () => {
        const response = await request(appPort).post('/api/altGetMainFeed')
            .send({ 'ProfileID': '636323c8c7af5bc4733c1111' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 

    test("Returns status code 400 if user does not exist", async () => {
        const response = await request(appPort).post('/api/altGetMainFeed')
            .send({ 'ProfileID': 'badUserID' })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})

describe("POST /addComment", () => {
    test("Returns status code 200 if recipe exists and is modified", async () => {
        const response = await request(appPort).post('/api/editRecipe')
            .send({ 'Ingredients': 'tomato sauce, pasta, onion', 
                    'Name': 'College Pasta',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
    })

    test("Returns status code 400 if recipe does not exist", async () => {
        const response = await request(appPort).post('/api/editRecipe')
            .send({ 'Ingredients': 'pumpkin puree, pie crust', 
                    'Name': 'College Pastry',
                    'ChefID': '636abacec3b021d0494084d6'
            })
            .set('Accept', 'application/json')
        expect(response.status).toBe(400);
    }) 
})
