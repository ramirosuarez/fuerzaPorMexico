var firebase = require('firebase/app')
require('firebase/auth')


function signUp(req,res){
	console.log(req.body)
  
	  const email = req.body.email
	  const password = req.body.password
		
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
	
	  res.redirect('/')
}
/*Funcion para iniciar la session*/
function logIn(req, res){
	const email 	=	req.body.email
	const password	=	req.body.password

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((user) => {
		console.log('has iniciad');
		res.redirect('/dash')
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		res.redirect('/login')
	});
}

/*funcion para salir de la sesion*/
function logOut(req,res){
	firebase.auth().signOut().then(() => {
     //Sign-out successful.
    console.log('cerraste session')
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
//Comprueva si se inicio seccion, 
function isAllReadyAuth (req,res,next){
	const user = firebase.auth().currentUser
	if(user != null){
		req.user = user
		res.redirect('/dash')
	}else{
		next()
	}
}


module.exports = {
	signUp:signUp,
	logIn : logIn,
	isAuth : isAuth,
	isAllReadyAuth : isAllReadyAuth,
	logOut : logOut
}