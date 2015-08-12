var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QuizDMR', errors: [] });
});

/*
// Question page.
//router.get('/quizes/question', function(req,res){
//  res.render('./quizes/question',{ title: 'Question - QuizDMR' });
//});
router.get('/quizes/question', quizController.question);

// Answer page.
//router.get('/answer', function(req,res){
//  res.render('./quizes/answer', { title: 'Answer - QuizDMR'});
//});
router.get('/quizes/answer', quizController.answer);
*/

// Autoload de comandos
router.param('quizId', quizController.load);  // Autoload de comandos con :quizId
router.param('commentId', commentController.load); // Autoload de comandos con :commentId

// Lista de preguntas - Definición de rutas de /quizes
// Index
router.get('/quizes', quizController.index);
// Question page.
router.get('/quizes/:quizId(\\d+)', quizController.show);
// Answer page.
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Add new question.
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
//Modify Questions
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit); // Para cargar el formulario
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
// Delete Questions
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// Add Comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',  sessionController.loginRequired, commentController.publish);

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


// Credits page.
router.get('/author', function(req,res){
  res.render('./author', { title: 'Credits', errors: []});
});



module.exports = router;
