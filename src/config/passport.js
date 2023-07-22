const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connection = require('../database');

passport.use(new LocalStrategy({
  usernameField: 'codigo',
  passwordField: 'contrasena',
  session: false,
  passReqToCallback: true // Permite pasar req a la función de callback
}, (req, codigo, contrasena, done) => {
  connection.query('SELECT * FROM Usuarios WHERE codigo_usuario = ?', [codigo], (error, results) => {
    if (error) {
      return done(error);
    }

    if (results.length === 0) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const user = results[0];

    if (user.contrasena !== contrasena) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    // Aquí puedes validar el tipo
    if (user.perfil !== req.body.perfil) {
      return done(null, false, { message: 'Acceso no autorizado' });
    }

    return done(null, user);
  });
}));


passport.serializeUser((user, done) => {
  done(null, user.codigo_usuario);
});

passport.deserializeUser((codigo_usuario, done) => {
  const query = `
    SELECT U.codigo_usuario, U.contrasena, U.perfil, P.nombre 
    FROM Usuarios U
    JOIN Personas P ON U.codigo_usuario = P.codigo_persona
    WHERE U.codigo_usuario = ?
  `;
  connection.query(query, [codigo_usuario], (error, results) => {
    if (error) {
      return done(error);
    }
    
    if (results.length === 0) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const user = results[0];
    return done(null, user);
  });
});
