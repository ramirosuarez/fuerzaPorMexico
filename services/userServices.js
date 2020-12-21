var firebase = require('firebase/app')
require('firebase/auth')

function logIn(req, res){
	const email 	=	req.body.email
	const password	=	req.bady.password

	firebase.auth().createUserWithEmailAndPassword(email, password)
	    .then((user) => {
	      // Signed in
	      // ...
	    })
	    .catch((error) => {
	      var errorCode = error.code;
	      var errorMessage = error.message;
	      console.log('contraseña corta')
	      // ..
	    });

}