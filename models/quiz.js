// DMR: Definición del Modelo Quiz (es decir en la base de datos, cómo es la tabla 'Quiz')

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz', 		// Nombre de la tabla/objetos
		{ pregunta: DataTypes.STRING,		// Campo de la tabla
			respuesta: DataTypes.STRING	// Campo de la tabla
	});
}
