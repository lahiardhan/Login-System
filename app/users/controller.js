module.exports = {
   index: async(req, res) => {
      try {
         res.render('index');
      } catch (err) {
         console.log(err);
      }
   },

   dashboard: async(req, res) => {
      try {
         res.render('dashboard',{
            user: req.user
         });
      } catch (err) {
         console.log(err);
      }
   },

}