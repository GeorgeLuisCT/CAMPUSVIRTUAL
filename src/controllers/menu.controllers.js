const MenuCtrl = {};
const connection = require('../database');
const queries = require('./queries/menu.queries');

MenuCtrl.renderMenu = (req, res) => {
  const query = 'SELECT * FROM usuarios WHERE codigo_usuario = ?';
  const userId = req.user.id;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      // Manejo del error...
    }
    // Los resultados de la consulta estarán en `results`

    switch (req.user.perfil) {
      case 'Estudiante':
        res.render('menu/menu_alumno', { menu: results });
        break;

      case 'Profesor':
        res.render('menu/menu_docente', { menu: results });
        break;

      default:
        break;
    }
  });
};



MenuCtrl.renderMatricula = (req, res) => {
  // Obtener el código de estudiante del usuario autenticado
  const codigoEstudiante = req.user.codigo_usuario;

  // Llamar a la función getMatriculaData para obtener los datos de la matrícula
  queries.getMatriculaData(codigoEstudiante, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
    } else {
      // Renderizar la vista con los datos obtenidos
      res.render('menu/components/matricula', { layout: false, matricula: results });
    }
  });
};



MenuCtrl.renderHorarioPage = (req, res) => {
  // Obtener el código de estudiante del usuario autenticado
  const codigoEstudiante = req.user.codigo_usuario;

  // Llamar a la función getMatriculaData para obtener los datos de la matrícula
  queries.getHorarioData(codigoEstudiante, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
    } else {
      // Renderizar la vista con los datos obtenidos
      res.render('menu/components/horario', { layout: false, horarios: results });
    }
  });
};


MenuCtrl.renderNotasPage = (req, res) => {
  res.render('menu/components/notas', { layout: false }, (err, html) => {
    if (err) {
      console.error('Error al renderizar el contenido:', err);
      res.status(500).send('Error al renderizar el contenido');
    } else {
      res.send(html);
    }
  });
};


// Define más funciones para otras opciones del menú

module.exports = MenuCtrl;
