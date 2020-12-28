const admin = require('firebase-admin')
const db = admin.firestore()

async function getAll(req, res){
  const data = []
  const afiliados = await db.collection('Afiliados').get()
  //console.log("sfsfsfsfsfsfs")
  for (const afiliado of afiliados.docs) {
    data.push({
      id:afiliado.id,
      data:afiliado.data() }  )
  }
  res.render('dash', {
    afiliados: data
  })
}

//Funcion para optener datos por id
async function getById(req,res){

  console.log(req.params.id)
  const id = req.params.id
  let data={}
  let afiliado = await db.collection('Afiliados').doc(id).get()
  data = {
    id:afiliado.id,
    data: afiliado.data()
   }
     console.log('data',data)
    res.render('view',{
      afiliado:data
   })

}


//funcion para agregar datos a la coleccion
async function add (req,res){
  console.log(req.body)
  await db.collection('Afiliados').add(req.body)
  res.redirect('/dash')
}

async function delet (req,res){
  console.log(req.params.id)
  const id = req.params.id
  console.log("se elimino el dato")
  await db.collection("Afiliados").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
  res.redirect('/dash')
}

//Funcion para optener datos por id
async function updat(req,res){

  console.log(req.params.id)
  const id = req.params.id
  
  let data={}
  let afiliado = await db.collection('Afiliados').doc(id).get()
  data = {
    id:afiliado.id,
    data: afiliado.data()
   }
   
   
    console.log('data',data)
    res.render('edit',{
      afiliado:data
    })
   
}

async function update (req,res){
  const afiliado = req.body
  console.log(req.body) 

}


module.exports = {
  getAll,
  getById,
  add,
  delet,
  update,
  updat
}