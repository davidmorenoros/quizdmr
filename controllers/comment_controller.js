// Definición de comment_controller.js
var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes/:quizID/comments/new
exports.new = function(req, res){
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors:[]});
};

// POST /quizes/:quizID/comments
exports.create = function(req,res){
	var comment = models.Comment.build(
		{ texto: req.body.comment.texto, 
			QuizId: req.params.quizId    // Para establecer la relación con Quiz tal y como la hemos definido en models.js
		});

	comment
	.validate()
	.then(
		function(err){
			if(err){
				res.render('comments/new.ejs', 
					{comment: comment, quizid: req.params.quizId, errors: er.errors});
			} else{
				comment   	// save: guarda en DB campo texto de comment
				.save()				
				.then( function(){res.redirect('/quizes/'+req.params.quizId)} )
				.catch(function(error){next(error)});
			}	//res.redirect: Redirección HTTP a lista de preguntas
		}
	).catch(function(error){next(error)});
};