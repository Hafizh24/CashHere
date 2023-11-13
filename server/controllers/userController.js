const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/transporter')
const fs = require('fs')
const handlebars = require('handlebars')

module.exports = {
  userLogin: async(req, res) => {
    try{
      let userLogin;
      const { password } = req.query;

      if(req.query.username){
          const {username} = req.query;
          userLogin = await User.findOne({
              where:{
                  username: username
              }
          })
      }

      if(userLogin == null){
          return res.status(409).send({
              message: 'User not found'
          })
      }

      const isValid = await bcrypt.compare(password, userLogin.password)
      if(!isValid){
          return res.status(400).send({
              message: 'Incorrect password'
          })
      }

      //data yang mau disimpan di token
      let payload = {id: userLogin.id}
      const token = jwt.sign(payload, 'thisiscashhere')
      
      res.status(200).send({
          message: "Login success",
          userLogin,
          token
      })
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  },
  addUser: async(req, res) => {
    try{
      const {username, email, password} = req.body;

      //check if user already exist
      const findUser = await User.findOne({
        where:{
          [Op.or]:[
              {username:username},
              {email:email}
          ]
        }   
      })

      //if user isn't already exist
      if(findUser == null){
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        await User.create({
          username: username,
          email: email,
          password: hashPassword,
          isVerified: true,
          isAdmin: false
        })
      }else{
        return res.status(400).send({ message: "User already exist" })
      }
      res.status(200).send({message: 'Register Success'})
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  },
  keepLogin: async(req, res) => {
    try{
        const user = await User.findOne({
            where:{
                id: req.user.id
            }
        })
        res.status(200).send({message: "Keep login", user})
    }catch(err){
        res.status(400).send({err: err.message})
    }
  },
  getUser: async (req, res) => {
    try{
      const dataCashier = await User.findAll({
        where:{
          isAdmin: false
        }
      })
      res.status(200).send({dataCashier})
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  },
  updateImage: async (req, res) => {
    try {
      await User.update(
        {
          image: req.file?.path,
        },
        {
          where: { id: 1 },
        }
      );
      res.status(200).send("success upload");
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try{
      const {id, isVerified, password} = req.body    
      const updateFields = {}

      if(id){
        updateFields.id = id;
        updateFields.isVerified = isVerified;
        await User.update(
          updateFields,
          {
            where:{
              id: id
            }
          }
        )
      }

      if(password){
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        updateFields.password = hashPassword;

        await User.update(
          updateFields,
          {
            where:{
              id: req.user.id
            }
          }
        )
      }
      res.status(200).send({message: "Data updated"})
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  },
  deleteCashier: async (req, res) => {
    const id = req.params.id
      try{
        const result = await User.destroy({
          where: {
              id: id,
          },
        });

        res.status(200).send({message: 'Account successfully deleted'});
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  },
  resetPassword: async(req, res) => {
    try{
      let { username, email } = req.query
      let payload = {id: req.user.id}
      const token = jwt.sign(payload, 'thisiscashhere')
      const data = fs.readFileSync('./template.html', 'utf-8')
      const tempCompile = await handlebars.compile(data)
      const tempResult = tempCompile({username: username, link:`http://localhost:3000/reset-password/${token}`})

      await transporter.sendMail({
          from: 'vadittolk@gmail.com',
          to: email,
          subject: 'Email Confirmation',
          html: tempResult
      }) 
    }catch(error){
      console.log("This is the error", error);
      res.status(400).send({ error: error.message });
    }
  }
};
