const express = require('express')
const router = express.Router()

//Se agrega la confuracion de la base de datos
const admin = require('firebase-admin')
const db = admin.firestore()
const firebase = require('firebase')


// router.post('/home', async(req, res) => {
//     console.log(req.body)
//     await db.collection('prueva').add(req.body)
//     res.redirect('/tabla')
// })


router.get('/', (req, res) => {
    res.render('signup',{
    })
})

// router.post('/signup', async (req,res) => {
//     console.log(req.body)
//     await db.collection('Afiliados').add(req.body)
//     res.redirect('/home')
// })


///////////////////////////////////////////
/**configuracion para ingresar usuarios  */
///////////////////////////////////////////
router.post('/signup', function (req,res) {
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


router.get('/signup', (req, res) => {
    res.render('signup',{
    })
})

/**
 * login
 */
router.get('/login',(req,res)=>{
    res.render('login',{
    })
})

router.post('/login', function(req, res) {
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

/**
 * cerrar sesion
 */
router.get('/logout', function (req, res) {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('cerraste session')
    }).catch(function(error) {
      // An error happened.
    });

  res.redirect('/login')
})
///////////////////////////////
// router.get('/home',(req,res)=>{
//     res.render('home',{
//     })
// })



router.get('/home',(req,res)=>{
    res.render('ladingPage')
})
// router.get('/tabla', async(req, res) => {
//         const data = []
//         const pruevaMuchas = await db.collection('prueva').get()
//         for (const prueva of pruevaMuchas.docs) {
//             data.push(prueva.data())
//         }
//         res.render('muestra', {
//             pruevas: data
//         })
//     })
    ///
module.exports = router