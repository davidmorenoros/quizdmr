// Definición del modelo de Comment con validación - Creación de la tabla de comentarios
// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
      }
    }    
  );
}