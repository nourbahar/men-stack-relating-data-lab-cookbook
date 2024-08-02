const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    return res.redirect('/');
    res.render('users/index.ejs', { users });
  });
});


router.get('/:userId', (req, res) => {
    try {
        const currentUser =  User.findById(req.session.user._id);
      
        const food = currentUser.foods.id(req.params.foodId);
       
        food.set(req.body);
        
         currentUser.save();
        
        res.redirect(
          `/users/${currentUser._id}/foods/${req.params.foodId}`
        );
      } catch (error) {
        console.log(error);
        res.redirect('/')
      }
});

module.exports = router;
