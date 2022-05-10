
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

exports.signup = async (req, res, next) => {
    const { email , password,role} = req.body
     try { 
         const emailExist = await User.find({email});
         if (emailExist.length >= 1) {
            return res.status(409).json({
                message: "email déja existe"
            })
        }
        const passwordBcrypt =   await bcrypt.hash(password, 10)
        const user = new User({
            email:email,
            password: passwordBcrypt,
            role: role,
          
        });
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
           });
           user.accessToken = accessToken;
       
         await  user.save()
         res.json({
            data: user,
           })
        //   res.status(201).json({ message: 'Utilisateur créé'});
     } catch (err) {
                
        console.log(err);
        res.status(500).json({
            error: err
        });
     }
 
    };
 

exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email n\'existe pas'));
     const  validPassword =   await bcrypt.compare(password, user.password);
     if (!validPassword) return next(new Error('mot de passe incorrect'))
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
     })
    } catch (error) {
     next(error);
    }
   }
   exports.getUsers = async (req, res, next) => {
       try {
        const user = res.locals.loggedInUser;
        // console.log('user',user);
        if(user.role == 'admin' || user.role == 'basic'){
            const users = await User.find({});
            res.status(200).json({
             data: users
            });
        }else{
            res.status(404).json("contactez admin")
        }
       
       } catch (error) {
        next(error)
       }

   
   }
    
 
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'utilsateur a été modifé'
     });
    } catch (error) {
     next(error)
    }
   }
    
//    exports.deleteUser = async (req, res, next) => {
//     try {
//     const user = res.locals.loggedInUser;
//     if (user.role == 'admin') {
   
//         await User.findByIdAndDelete({_id: req.params.id});
//         res.status(200).json({
//          data: null,
//          message: 'utilsateur a été supprimé'
//         });
//     }else {
//         res.status(404).json("contactez admin s'ils vous plaît")
//     }
   
//     } catch (error) {
//      next(error)
//     }
//    }

   exports.deleteUser = async (req, res, next) => {

    try {
        const user = res.locals.loggedInUser;
        const userId = req.params.id;
        console.log('user',user)
        if(user && user.role == 'admin'){
            const Userdelete = await User.findByIdAndDelete(userId) 
            res.status(200).json({
              data: null,
              message: 'utilsateur a été supprimé'
             });
        }else{
            res.status(404).json("contactez admin")
        }
      
    } catch (error) {
      next(error);
    }

  };
    