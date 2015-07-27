// Definición del modelo de Comment con validación - Creación de la tabla de comentarios

module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Comment',
		{texto: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "Falta Comentario"}}
			}
		}
		);
}