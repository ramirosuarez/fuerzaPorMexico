const admin = require('firebase-admin')
const db = admin.firestore()

async function getAll(req, res){

  const data = []
  const afiliados = await db.collection('Afiliados').get()
  console.log("sfsfsfsfsfsfs")
  for (const afiliado of afiliados.docs) {
    data.push(afiliado.data())
  }
  res.render('dash', {
    afiliados: data
  })
}


module.exports = {
  getAll
}