const connection = require('../../database');
const consultCtrl = {};

consultCtrl.getMatriculaData = (codigoEstudiante, callback) => {
  // Consulta SQL para obtener los datos
  const sql = `
    SELECT Cursos.codigo_curso AS Curso, Cursos.nombre_curso AS Nombre, Cursos.ciclo AS Ciclo, Cursos.creditos AS Creditos,
           Cursos.exigencia AS Exig, Matricula.vez AS Vez, Matricula.seccion AS Sec, Matricula.grupo AS Gru,
           PlanesDeEstudio.nombre_plan AS PE, Matricula.tipo_matricula AS TipoMat
    FROM Matricula
    INNER JOIN Cursos ON Matricula.codigo_curso = Cursos.codigo_curso
    INNER JOIN PlanesDeEstudio ON Matricula.codigo_plan = PlanesDeEstudio.codigo_planestudio
    WHERE Matricula.codigo_estudiante = ?
  `;

  // Ejecutar la consulta con el código del estudiante
  connection.query(sql, [codigoEstudiante], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

consultCtrl.getHorarioData = (codigoEstudiante, callback) => {
    // Consulta SQL para obtener los datos
    const sql = `
    SELECT Horarios.horario, Cursos.nombre_curso, Horarios.tipo_curso, Horarios.ambiente, CONCAT(Personas.nombre, ' ', Personas.apellido) AS nombre_completo, Horarios.pabellon
    FROM Horarios
    JOIN Cursos ON Horarios.codigo_curso = Cursos.codigo_curso
    JOIN Profesores ON Horarios.codigo_profesor = Profesores.codigo_profesor
    JOIN Personas ON Profesores.codigo_profesor = Personas.codigo_persona
    `;
  
    // Ejecutar la consulta con el código del estudiante
    connection.query(sql, [codigoEstudiante], (error, results) => {
      if (error) {
        console.error('Error al obtener los datos:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  };

module.exports = consultCtrl;