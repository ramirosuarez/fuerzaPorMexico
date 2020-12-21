const express = require('express')
const router = express.Router()

/*  Se agrega la confuracion de la base de datos  */
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')

/* */
router.get('/', (req, res) => {
  res.render('ladingPage', {

  })
})

/** creacion de usuarios-[signup] */
router.get('/signup', (req, res) => {
  res.render('signup', {
  })
})
router.post('/signup', function (req, res) {
  console.log(req.body)
  
  let email = req.body.email
  let password = req.body.password
  
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

  res.redirect('/home')

})


/**inicio de sesion- [login]  */
router.get('/login', (req, res) => {
  res.render('login', {
  })
})

router.post('/login', function (req, res) {
  console.log(req.body)

  let email = req.body.email
  let password = req.body.password

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('has iniciad');
      res.redirect('/home')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
})

/** Cerrar sesion - [logout]*/
router.get('/logout', function (req, res) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log('cerraste session')
  }).catch(function (error) {
    // An error happened.
  });
  res.redirect('/login')
})
/* formulario de Agremiado */
router.get('/addAgremiado', (req, res) => {
  res.render('addAgremiado', {
  })
})

router.post('/addAgremiado', async (req, res) => {
  console.log(req.body)
  await db.collection('Afiliados').add(req.body)
  res.redirect('/dash')
})



router.get('/dash', async (req, res) => {
  const data = []
  const afiliados = await db.collection('Afiliados').get()
  for (const afiliado of afiliados.docs) {
    data.push(afiliado.data())
  }
  res.render('dash', {
    afiliados: data
  })
})

module.exports = router


// router.post('/home', async(req, res) => {
//     console.log(req.body)
//     await db.collection('prueva').add(req.body)
//     res.redirect('/tabla')
// })



// router.post('/signup', async (req,res) => {
//     console.log(req.body)
//     await db.collection('Afiliados').add(req.body)
//     res.redirect('/home')
// })

// router.post('/signup', async (req,res) => {
//     console.log(req.body)
//     await db.collection('Afiliados').add(req.body)
//     res.redirect('/home')
// })
/**
 * Agregar un dato a la base de dato en firebase
 */

///////////////////////////////
// router.get('/home',(req,res)=>{
//     res.render('home',{
//     })
// })