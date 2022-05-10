const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
 const auth = require('../database/jwt');
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/users', auth, userController.getUsers);
 
router.put('/users/:userId', auth,userController.updateUser);
 
router.delete('/users/:id', auth,userController.deleteUser);
 
module.exports = router;