// DMR: Definición del Modelo Quiz (es decir en la base de datos, cómo es la tabla 'Quiz')

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz', 		// Nombre de la tabla/objetos
		{ 
			pregunta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "Falta Pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "Falta Respuesta"}}
			},
			tema: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "Falta Temática"}}
			}
		}
	);
}
