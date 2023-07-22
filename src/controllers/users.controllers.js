const userCtrl = {};
const passport = require("passport");

userCtrl.renderSigninForm = (req, res) =>{
    
    res.render('users/signin', { path: req.path });
}

userCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/menu',
    failureFlash:true 
});

userCtrl.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Sesión cerrada');
        res.redirect('/users/signin');
    });
};



module.exports = userCtrl;