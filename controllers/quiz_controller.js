// DMR

exports.question = function(req,res){
  res.render('./quizes/question',{ pregunta: '¿Cúal es la capital de Italia?' });
};

exports.answer = function(req,res){
  if(req.query.respuesta === 'Roma'){
	res.render('./quizes/answer', { respuesta: 'Respuesta correcta' });
  }
  else{
	res.render('./quizes/answer', { respuesta: 'Respuesta incorrecta' });
  }
};
