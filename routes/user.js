const express = require('express');
const router = express.Router();

//import model users dari folder model
const User = require('../model/User');

//GET /users (ENDPOINT 1)
router.get("/users", (req, res, next)=>{
  try {
    res.status(200).json({
      status: "Success",
      message: "Succesfully fetch all user data",
      users: User
    })
  } catch (error) {
    console.log(error.message);
  }
})

//GET /users/:userId -> GET /users/1
router.get("/users/:userId",(req,res,next)=>{
  try {
    //const userId = req.params.userId;
    
    //ambil :userId dari req.params
    const {userId} = req.params; //tipe string

    //select user sesuai user id yang diharapkan
    const user = User.find((e)=>{
      return e.id == userId
    })

    if(user === undefined){
      res.status(400).json({
        status: "Error",
        message: `User with id ${userId} is not existed!`
      })
    }
    res.status(200).json({
      status:"Success",
      message: "Succesfully fetch user data",
      user: user
    })
  } catch (error) {
    
  }
})

//POST /users
router.post("/users", (req,res,next)=>{
  try {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;

    const {nama, divisi} = req.body;

    const sizeUser = User.length;

    const newUser = {
      id: sizeUser,
      nama: nama,
      divisi: divisi,
    };

    User.push(newUser);

    res.status(201).json({
      status: "Success",
      message: "Succesfully Add User"
    })
  } catch (error) {
    
  }
})

//PUT /users

//DELETE /users/:userId
router.delete("/users/:userId", (req,res,next)=>{
  try {
    const {userId} = req.params;

    //mencari index user dari array model user
    const targetedIndex = User.findIndex((element)=>{
      return element.id == userId
    })

    //user tidak ketemu
    if(targetedIndex === -1){
      res.status(400).json({
        status: "Error",
        message: `User with id ${userId} is not existed`
      })
    }

    //hapus array pada [targetedIndex] sebanyak 1 buah element
    User.splice(targetedIndex, 1);

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user"
    })
  } catch (error) {
    console.log(error.message);
  }
})




module.exports = router;