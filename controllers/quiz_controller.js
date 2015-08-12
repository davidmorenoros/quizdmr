// DMR

// Lista de Preguntas y Autoload
var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment
            }]
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
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
	console.log('req.params.Comments: ' + req.params.Comments);	
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