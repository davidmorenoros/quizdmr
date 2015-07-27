var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

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

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Lista de preguntas - Definición de rutas de /quizes
// Index
router.get('/quizes', quizController.index);
// Question page.
router.get('/quizes/:quizId(\\d+)', quizController.show);
// Answer page.
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Add new question.
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
//Modify Questions
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit); // Para cargar el formulario
router.put('/quizes/:quizId(\\d+)', quizController.update);
// Delete Questions
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

// Credits page.
router.get('/author', function(req,res){
  res.render('./author', { title: 'Credits', errors: []});
});



module.exports = router;
