const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'JorgeCT19',
  database: 'untrm'
});

// Establecer la conexión
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');

})

module.exports = connection;