const express = require('express')
const router = express.Router()

/*  Se agrega la confuracion de la base de datos  */
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')

/** */
const userServices = require('../services/userServices')
const afiliadoService = require('../services/afiliadoServices')
/* */
router.get('/', (req, res) => {
  res.render('index', {
  })
})

/** creacion de usuarios-[signup] */
router.get('/signup', (req, res) => {
  res.render('signup', {
  })
})

router.post('/signup', userServices.signUp)

/*    ----------    */

/**inicio de sesion- [login]  */
router.get('/login', (req, res) => {
  res.render('login', {
  })
})

router.post('/login',userServices.logIn)

/*    ----------    */

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
/*    ----------    */
/* formulario de Agremiado */
router.get('/add', (req, res) => {
  res.render('add', {
  })
})

router.post('/add',afiliadoService.add)


router.get('/dash',afiliadoService.getAll)

router.get('/view/',afiliadoService.getById)
router.get('/delete/:id',afiliadoService.delet)
router.get('/update/',afiliadoService.getById)


// router.get('/view/:id', (req,res)=>{
//   res.render('view',{

//   })
// })

// router.get('/view',(req,res)=>{
//   console.log(req.query.data)
// })

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
/*router.post('/login', function (req, res) {
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
*/
    // router.post('/signup', function (req, res) {
    //   console.log(req.body)
    
    //   let email = req.body.email
    //   let password = req.body.password
      
    //   firebase.auth().createUserWithEmailAndPassword(email, password)
    
    //     .then((user) => {
    //       // Signed in
    //       // ...
    //     })
    //     .catch((error) => {
      //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       console.log('contraseña corta')
    //       // ..
    //     });
    
    //   res.redirect('/home')
    
    // })
    // router.get('/dash', async (req, res) => {
    //   const data = []
    //   const afiliados = await db.collection('Afiliados').get()
    //   for (const afiliado of afiliados.docs) {
    //     data.push(afiliado.data())
    //   }
    //   res.render('dash', {
    //     afiliados: data
    //   })
    // })
/*
router.post('/addAgremiado', async (req, res) => {
  console.log(req.body)
  await db.collection('Afiliados').add(req.body)
  res.redirect('/dash')
})*/