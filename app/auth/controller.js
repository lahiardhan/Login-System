const User = require("../users/model");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = {
	viewLogin: async (req, res) => {
		try {
			res.render("login", {
            title: 'Login',
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
		} catch (err) {
			console.log(err);
		}
	},

	actionLogin: async (req, res, next) => {
		passport.authenticate("local", {
			successRedirect: "/dashboard",
			failureRedirect: "/auth/login",
			failureFlash: true,
		})(req, res, next);
	},

	viewSignUp: async(req, res) => {
      try {
         res.render('signup', {
            title: 'Sign Up',
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

         //check if all input fields has filled 
         if(!username || !email || !password || !password2) {
            req.flash('alertMessage', 'Please Fill in all fields');
            req.flash('alertStatus', 'danger');
            res.redirect('/auth/signup');
         }

         //check if password match
         else if(password !== password2) {
            req.flash('alertMessage', "Passwords doesn't match");
            req.flash('alertStatus', 'danger');
            res.redirect('/auth/signup');
         }

         //check if password is more than 6 characters
         else if(password.length < 6 ) {
            req.flash('alertMessage', 'Password at least have 6 characters');
            req.flash('alertStatus', 'danger');
            res.redirect('/auth/signup');
         }
         else {
            User.findOne({ username: username }).then((uname) => {
               if(uname) {
                  req.flash('alertMessage', 'username already registered');
                  req.flash('alertStatus', 'danger');
                  res.redirect('/auth/signup');
               } else {
                  User.findOne({ email: email }).then((mail) => {
                     if (mail) {
                        req.flash('alertMessage', 'email already registered');
                        req.flash('alertStatus', 'danger');
                        res.redirect('/auth/signup');
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
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'danger');
         res.redirect('/auth/signup');
      }
   },
	logOut: async (req, res) => {
		req.logout();
		req.flash("success_msg", "Now logged out");
		res.redirect("/auth/login");
	},
};
