
-- Crear la base de datos
CREATE DATABASE untrm;

-- Utilizar la base de datos
USE untrm;

-- Crear la tabla "Personas" como tabla padre
CREATE TABLE Personas (
codigo_persona VARCHAR(10) PRIMARY KEY,
nombre VARCHAR(20),
apellido VARCHAR(30)
);

-- Crear la tabla "Estudiantes" como tabla hija de "Personas"
CREATE TABLE Estudiantes (
codigo_estudiante VARCHAR(10) PRIMARY KEY,
FOREIGN KEY (codigo_estudiante) REFERENCES Personas(codigo_persona)
);

-- Crear la tabla "Profesores" como tabla hija de "Personas"
CREATE TABLE Profesores (
codigo_profesor VARCHAR(10) PRIMARY KEY,
FOREIGN KEY (codigo_profesor) REFERENCES Personas(codigo_persona)
);

-- Crear la tabla "Usuarios"
CREATE TABLE Usuarios (
codigo_usuario VARCHAR(10) PRIMARY KEY ,
contrasena VARCHAR(50) NOT NULL,
perfil VARCHAR(20) NOT NULL,
FOREIGN KEY (codigo_usuario) REFERENCES Personas(codigo_persona)
);
-- -----------------------------------------------------------------------------------------------------

-- Crear tabla "Carrera"
CREATE TABLE Carreras(
codigo_carrera INT AUTO_INCREMENT PRIMARY KEY,
nombre_carrera VARCHAR(50) NOT NULL
);

-- Crear tabla "PlanesDeEstudio"
CREATE TABLE PlanesDeEstudio (
  codigo_planestudio INT AUTO_INCREMENT PRIMARY KEY  ,
  codigo_carrera INT,
  nombre_plan VARCHAR(255),
  FOREIGN KEY (codigo_carrera) REFERENCES Carreras (codigo_carrera)
);

-- Crear tabla "Cursos"
CREATE TABLE Cursos (
  codigo_curso VARCHAR(30) PRIMARY KEY,
  codigo_plan INT,
  nombre_curso VARCHAR(255),
  ciclo INT,
  creditos INT,
  horas_teoria INT,
  horas_practica INT,
  horas_totales INT,
  pre_requisito VARCHAR(255),
  exigencia VARCHAR(30),
  FOREIGN KEY (codigo_plan) REFERENCES PlanesDeEstudio (codigo_planestudio),
  FOREIGN KEY (exigencia) REFERENCES Cursos (codigo_curso) 
);

-- Crear tabla "Matricula"
CREATE TABLE Matricula (
  codigo_matricula INT AUTO_INCREMENT PRIMARY KEY,
  codigo_curso VARCHAR(30),
  codigo_plan INT,
  codigo_estudiante VARCHAR(10),
  vez INT,
  seccion VARCHAR(10),
  grupo VARCHAR(10),
  periodo_academico VARCHAR(20),
  tipo_matricula VARCHAR(20),
  FOREIGN KEY (codigo_curso) REFERENCES Cursos (codigo_curso),
  FOREIGN KEY (codigo_plan) REFERENCES PlanesDeEstudio (codigo_planestudio),
  FOREIGN KEY (codigo_estudiante) REFERENCES Estudiantes (codigo_estudiante)
);



-- Crear tabla "Horarios"
CREATE TABLE Horarios (
  codigo_horario INT AUTO_INCREMENT PRIMARY KEY,
  horario VARCHAR(30),
  codigo_curso VARCHAR(30),
  tipo_curso VARCHAR(20),
  ambiente VARCHAR(50),
  codigo_profesor VARCHAR(10),
  pabellon VARCHAR(20),
  codigo_estudiante VARCHAR(10),
  FOREIGN KEY (codigo_curso) REFERENCES Cursos (codigo_curso),
  FOREIGN KEY (codigo_profesor) REFERENCES Profesores (codigo_profesor),
  FOREIGN KEY (codigo_estudiante) REFERENCES Estudiantes (codigo_estudiante)
);


