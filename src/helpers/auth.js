const helpers = {};

helpers.isAuthenticated = (req, res, next) =>{
    if (req.isAuthenticated()) {
       
        return next();
    }
    req.flash('error_msg', 'Por Favor Inicia Sesión');
    res.redirect('/users/signin');
}

helpers.isNotAuthenticated = (req, res, next) =>{
    if (req.isAuthenticated()) {
        // El usuario ya está autenticado, redirigir o mostrar mensaje de error
        res.redirect('/menu'); // Redirigir a otra página
        // O mostrar un mensaje de error
        // res.status(403).send('Acceso denegado');
      } else {
        // El usuario no está autenticado, permitir continuar con la siguiente función de middleware o ruta
        next();
      }
}

module.exports = helpers; 
