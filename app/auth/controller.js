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
	logOut: async (req, res) => {
		req.logout();
		req.flash("success_msg", "Now logged out");
		res.redirect("/auth/login");
	},
};
