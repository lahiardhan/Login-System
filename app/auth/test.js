const User = require('../users/model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
   viewSignUp: async(req, res) => {
      try {
         res.render('signup', {
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'danger');
         res.redirect('/auth/signup');
      }
   },
   actionSignUp: async(req, res) => {
      try {
         const { username, email, password, password2 } = req.body;
         console.log(
		   	" Username " + username + " email :" + email + " pass:" + password
		   );
         if(!username || !email || !password || !password2) {
            req.flash('alertMessage', 'Please Fill in all fields');
            req.flash('alertStatus', 'danger');
            res.redirect('/auth/signup');
         }
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'danger');
         res.redirect('/auth/signup');
      }
   },
}