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
async function getById(req,res,next){

  console.log(req.query.id)
  console.log(req.query.op)

  const id = req.query.id
  const op = req.query.op
  let data={}
  let afiliado = await db.collection('Afiliados').doc(id).get()
  data = {
    id:afiliado.id,
    data: afiliado.data()
   }
   if(op == 1){
     console.log('data',data)
    res.render('view',{
      afiliado:data
    })

   }else if(op == 2){
       console.log('data',data)
    res.render('edit',{
      afiliado:data
    })
   }
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
//para obtener el id a actualizar 
async function updateByid(){
console.log(req.params.id)
  const id = req.params.id
  let data={}
  let afiliado = await db.collection('Afiliados').doc(id).get()
   data = {
     id:afiliado.id,
    data: afiliado.data()
   }
   console.log('data',data)
  res.render('update',{
    afiliado:data
  })
}



module.exports = {
  getAll,
  getById,
  add,
  delet
}