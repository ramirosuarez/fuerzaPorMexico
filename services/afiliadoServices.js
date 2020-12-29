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
      res.render('edit',{
        afiliado:data
      })
    }
    if(op == 2){
      console.log('data',data)
      res.render('view',{
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
  console.log(req.query.id)
  const id = req.query.id
  console.log("se elimino el dato")
  await db.collection("Afiliados").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
  res.redirect('/dash')
}


async function update (req,res){
  console.log(req.body) 
  const afiliado = req.body
  await db.collection('Afiliados').doc(afiliado.id).update({
    nombre      :  afiliado.nombre,
    apellido_p  :  afiliado.apellido_p,
    apellido_m  :  afiliado.apellido_m,
    folio       :  afiliado.folio,
    especialidad:  afiliado.especialidad,
    curp        :  afiliado.curp,
    rfc         :  afiliado.rfc,
    seguro_social: afiliado.seguro_social,
    telefono    :  afiliado.telefono,
    fecha_nacimiento: afiliado.fecha_nacimiento,
    colonia     :  afiliado.colonia,
    calle       :  afiliado.calle,
    municipio   :  afiliado.municipio,
    ciudad      :  afiliado.ciudad,
    num_ext     :  afiliado.num_ext,
    num_int     :  afiliado.num_int,
    estado      :  afiliado.estado,
    cp          : afiliado.cp
  })

  res.redirect('/dash')
}


module.exports = {
  getAll,
  getById,
  add,
  delet,
  update
}
/*Funcion para optener datos por id
async function updat(req,res){

  console.log(req.query.id)
  const id = req.query.id
  
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
   
}*/