// Se predefinen dos usuarios (admin y pepe)
var users = { admin: {id:1, username:"admin", password:"1234"},
              david:  {id:2, username:"david",  password:"1234"}
            };

// Se comprueba si el usuario existe en users
// Si lo está, devuelve sus datos
// En caso, se lanza una excepción con el error correspondiente
exports.autenticar = function(login, password, callback) {
  console.log("login:"+login+" password:"+password);
  if (users[login]) {
      console.log("login econtrado");
      if (password === users[login].password) {
            console.log("password econtrado");
            callback(null, users[login]);
      }
      else { callback(new Error('Password erróneo.')); }
  } else { callback(new Error('No existe el usuario.')); }
};