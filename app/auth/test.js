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
      const {username,email, password, password2} = req.body;
         let errors = [];
         console.log(' Username ' + username+ ' email :' + email+ ' pass:' + password);
         
         //check if all input fields has filled 
         if(!username || !email || !password || !password2) {
            errors.push({msg : "Please fill in all fields"})
         }
         //check if password match
         if(password !== password2) {
            errors.push({msg : "passwords doesn't match"});
         }

         //check if password is more than 6 characters
         if(password.length < 6 ) {
            errors.push({msg : 'password atleast 6 characters'})
         }
         if(errors.length > 0 ) {
            res.render('signup', {
               errors : errors,
               username : username,
               email : email,
               password : password,
               password2 : password2
            })
         } else {
            //validation passed
            User.findOne({ username: username }).then((uname) => {
               if(uname) {
                  errors.push({msg: 'username already registered'});
                  res.render('signup',{errors,username,email,password,password2})
               } else {
                  User.findOne({ email: email }).then((mail) => {
                     if (mail) {
                        errors.push({msg: 'email already registered'});
                        res.render('signup',{errors,username,email,password,password2})
                     } else {
                        const newUser = new User({
                           username : username,
                           email : email,
                           password : password
                        });
                        // hash password
                        bcrypt.genSalt(10, (err, salt) => {
                           bcrypt.hash(newUser.password, salt, (err, hash) => {
                              if(err) throw(err);
                              // save pass to hash
                              newUser.password = hash;
                              // save user
                              newUser.save().then((value) => {
                                 console.log(value);
                                 req.flash('success_msg', 'You have now registered!');
                                 res.redirect('/auth/login');
                              })
                              .catch(value=> console.log(value));
                           })
                        })
                     }
                  })
               }
            })
         }    
   },
}