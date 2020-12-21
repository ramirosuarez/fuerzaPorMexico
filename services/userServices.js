var firebase = require('firebase/app')
require('firebase/auth')

/*Funcion para iniciar la session*/
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

/*funcion para salir de la sesion*/
function logOut(req,res){
	firebase.auth().signOut().then(() => {
    // Sign-out successful.
    //console.log('cerraste session')
    res.redirect('/')
  }).catch(function (error) {
    // An error happened.
    console.log(error)
  });
  //res.redirect('/login')
}


function isAuth(req, res,next){
	const user = firebase.auth().currentUser
	if(user != null){
		req.user = user
		next()
	}else{
		res.redirect('/')
	}
}

function isAllReadyAuth (res,req,next){
	const user = firebase.auth().currentUser
	if(user != null){
		req.user = user
		res.redirect('/admin')
	}else{
		next()
	}
}


module.exports = {
	iniciarSession = logIn,
	isAuth = isAuth,
	isAllReadyAuth = isAllReadyAuth,
	logOut = logOut
}