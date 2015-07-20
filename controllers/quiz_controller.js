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