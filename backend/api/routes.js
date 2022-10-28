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

// Login 
router.post('/login', async (req, res, next) => 
{
  const { username, password } = req.body;

    const loginUser = new userRegister 
    ({
        username: req.body.username,
        password: req.body.password
    })

  var id = -1;
  var fn = '';
  var ln = '';
  var error = 'Login unsuccessful.';

  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].first_name;
    ln = results[0].last_name;
    pw = results[0].password;
    if (bcrypt.compare(password, this.password))
    error = '';
    var ret = { _id:id, first_name:fn, last_name:ln, error:error};
    res.status(200).json(ret);
    return;
  }

  res.status(400).json({ _id:id, first_name:fn, last_name:ln, error:error});
})

module.exports = router;