module.exports = {
   index: async(req, res) => {
      try {
         res.render('index', {
            title: 'Login System | Express JS',
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'danger');
         res.redirect('/');
      }
   },

   dashboard: async(req, res) => {
      try {
         res.render('dashboard',{
            user: req.user,
            title: 'dashboard',
            message: req.flash('alertMessage'),
            status: req.flash('alertStatus')
         });
      } catch (err) {
         req.flash('alertMessage', `${err.message}`);
         req.flash('alertStatus', 'danger');
         res.redirect('/dashboard');
      }
   },

}