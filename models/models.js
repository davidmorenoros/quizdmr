// DMR: Definición de models.js

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

/*
// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
							{dialect:"sqlite", storage:"quiz.sqlite"}
					);
*/

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
							{dialect:protocol, 
							 protocol:protocol, 
							 port:port,
							 host:host,
							 //storage:storage, // Sólo SQLite .env
							 omitNULL:true		// Sólo Postgres
							}
					);

/*// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
*/
// Importar la definición de la tabla Quiz en BBDD
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;  // exportar definición de tabla Quiz

/*
// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(){
		if(count === 0){ // La tabla se inicializa solo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});

		};
	});

});
*/
// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count === 0){ // La tabla se inicializa solo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
			.then(function(){console.log('Base de datos inicializada')});

		};
	});

});