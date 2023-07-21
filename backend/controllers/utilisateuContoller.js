const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateur');


//----------------LOGIN 

const login = asyncHandler(async (req, res) => {
       const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).send({ message: "Please fill all the fields"})
    }

    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
    } else {  const token = generateToken(user); 
        res.cookie('token',  token, {expires: new Date(Date.now() + 9999999), httpOnly: false}); 
           res.status(200).json({ userId: user._id, token , role: user.role});
    }
  
});


//------------------GET USERS

const getUsers = asyncHandler( async (req, res) => {
    const Users = await User.find();
    res.json(Users);
});


//---------------------SET USERS
const setUser= async (req, res) => {
    const {username, nom, email,password1,password2, phone, role, birth } = req.body;

    if (!username || !nom || !email|| !password1 ||  !password2 || !phone || !role || !birth) {
        res.status(400)
        throw new Error('All fields are required');
    }
    if (password1!=password2) {
        res.status(400)
        throw new Error('The password is not matching');
    }
    try{
        const user = await User.create({
            nom,
            username,
            email,
            password:password1,
            phone,
            role,
            birth
        }); 
            
        res.json(user);
    }catch(err){
        console.log(err);
    }
};



//Get User by Id

const getuserByID = asyncHandler( async(req, res) => {
    try{
        const user = await User.findById(req.params._id)
        res.json(user);
    }catch(err){
        console.log(err)
    }
})

//Update User

const updateUser = asyncHandler( async(req, res) => {
    const user= await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedUser);
});



//Delete user

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params._id;

    User.findByIdAndDelete(id)
    .then(data => {

        if (!data) {
            res.status(404).send({
                message: "User not found!"
            });
            } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    })
    .catch(err => console.warn(err))
});



//
const generateToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email
    };

    const options = {
        expiresIn: '72h'
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = {
    getUsers,
    setUser,
    getuserByID,
    updateUser,
    deleteUser,
    login
};