const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/model.js');

//Post Method
router.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const data = new userRegister({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            try {
                const newUser = await data.save();
                console.log(newUser);
                res.status(200).json(newUser)
                res.status(201).json({ message: "User created successfully"})
            } catch(error) {
                console.log(error);
                res.status(400).json({message: error.message})
            }
        }
    })
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await userRegister.find();
        res.json(data) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;