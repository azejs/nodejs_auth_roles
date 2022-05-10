const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
module.exports = async (req, res, next) => {
     
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        const decodedToken = jwt.verify(token,  process.env.JWT_SECRET);
        // console.log(decodedToken)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            res.locals.loggedInUser = await User.findById(userId);
            next();
        }
    } catch (error) {
        res.status(401).json('Requête non authentifiée');

    }
};
