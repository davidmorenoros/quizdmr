// DMR

// SIN BBDD
/*
// Get /quizes/question sin BBDD
exports.question = function(req,res){
  res.render('./quizes/question',{ pregunta: '¿Cúal es la capital de Italia?' });
};

// Get /quizes/answer sin BBDD
exports.answer = function(req,res){
  if(req.query.respuesta === 'Roma'){
	res.render('./quizes/answer', { respuesta: 'Respuesta correcta' });
  }
  else{
	res.render('./quizes/answer', { respuesta: 'Respuesta incorrecta' });
  }
};
*/
// FIN: SIN BBDD

/* FALLA ALGO 
// CON BBDD
var models = require('../models/models.js');
// Get /quizes/question con BBDD
exports.question = function(req,res){
  models.Quiz.findAll().success(function(quiz){
  	res.render('./quizes/question',{ pregunta: quiz[0].pregunta })
  })
};

// Get /quizes/answer con BBDD
exports.answer = function(req,res){
	models.Quiz.findAll().promise(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('./quizes/answer', { respuesta: 'Respuesta correcta' });
  		}
  		else{
			res.render('./quizes/answer', { respuesta: 'Respuesta incorrecta' });
  		}		
	})
};
// FIN: CON BBDD
*/

/*
var models = require('../models/models.js');
//GET /quizes/question

exports.question = function(req, res){
	console.log('entra en el controller de quiz en preguntas');
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	});
	console.log('sale del controller de quiz en preguntas');
};

//GET /quizes/answer

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer',{respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{respuesta: 'Incorrecto'});
		}
	})
};

*/

// Lista de Preguntas y Autoload
var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else{
				next( new Error('No existe quizID=' + quizId));
			}
		}
		).catch(function(error){ next(error);});
};

//GET /quizes
exports.index = function(req, res){
	//console.log('req.query.search: ' + req.params.search);
	//Obtenems la busqueda enviada en la petición
	var busqueda = req.query.search || "";
	//Reemplazamos los espacios
	busqueda = busqueda.replace(/ /g,"%");
	//Añadimos los comodines al inicio y final
	busqueda = "%"+busqueda+"%";

	models.Quiz.findAll({where: ["pregunta like ?", busqueda]}).then(function(quizes) {
		res.render("quizes/index.ejs", {quizes: quizes, errors: []});
	}).catch(function(error) { next(error); });
};


//GET /quizes/:id
exports.show = function(req, res){
	//console.log('entra en el controller de quiz en preguntas');
	//console.log('req.params.quizId: ' + req.params.quizId);	
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', errors: []});
		} else {
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors: []});
		}
	})
};

//GET /quizes/new
exports.new = function(req, res){
	//Obtenems la busqueda enviada en la petición
	var quiz = models.Quiz.build(  // Crea el objeto Quiz
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}

	);//.catch(function(error) { next(error); });

	res.render('quizes/new', {quiz:quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	
	quiz
	.validate()
	.then(
	 function(err){
		if (err) {
			res.render('quizes/new', { quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta", "tema"]})  // Guarda en BBDD los campos pregunta y respuesta de quiz
			.then( function(){  res.redirect('/quizes')}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	});
};

//GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;  // Autoload instancia de quiz
		
	res.render('quizes/edit', {quiz:quiz, errors: []});
};

//PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz
	.validate()
	.then(
	 function(err){
		if (err) {
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors});
		} else {
			req.quiz.save({fields: ["pregunta", "respuesta", "tema"]})  // Guarda en BBDD los campos pregunta y respuesta de quiz
			.then( function(){  res.redirect('/quizes')}) // Redirección HTTP (URL relativo) lista de preguntas
		}
	});
};

//DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function(){
			res.redirect('/quizes');
		}).catch(function(error){next(error)});

};