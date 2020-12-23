const admin = require('firebase-admin')
const db = admin.firestore()

async function getAll(req, res){

  const data = []
  const afiliados = await db.collection('Afiliados').get()
  console.log("sfsfsfsfsfsfs")
  for (const afiliado of afiliados.docs) {
    data.push({
      id:afiliado.id,
      data:afiliado.data() }  )
  }
  res.render('dash', {
    afiliados: data
  })
}

async function add (req,res){
  console.log(req.body)
  //await db.collection('Afiliados').add(req.body)
  //res.redirect('/dash')
}

module.exports = {
  add,
  getAll
}