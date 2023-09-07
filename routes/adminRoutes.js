const express = require("express");
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname  + "-" + Date.now() + '.png' )
  }
})
const upload = multer({ storage: storage })


const {formatoEditar, getNoticia, noticiaEditada, preguntaBorrar, borrarNoticia, crearNoticia, noticiaCreada,subirFoto,fotoSubida, getNoticiaEditor, buscarNoticiaEditor, getEditores, preguntaBorrarEditor, borrarEditor} = require("../controllers/adminController")

//SUBIR IMAGEN

router.get("/subir/", subirFoto)


//PRUEBA COOKIES


//CREAR NOTICIA
router.get("/crear/", crearNoticia)

//CREADA NOTICIA
router.post("/creada/", noticiaCreada)


//Mostrar el formulario de 'editar' pelicula
router.get('/editar/:id/:uid/:nombrecreador/:miuid/:minombrecreador', formatoEditar)

//lanza la pelicula ya editada
router.post('/editada/:id',  upload.single('uploaded_file'), noticiaEditada)
//PREGUNTA POR BORRAR  
router.get('/borrar/:titulo/:uid/:nombrecreador', preguntaBorrar)
//lanza la noticia ya borrada
router.get('/borrada/:id/:uid/:nombrecreador', borrarNoticia)

router.get("/todasnoticiasadmin/:id/:nombrecreador", getNoticia)
router.get("/buscareditor/", buscarNoticiaEditor)

router.get("/noticiaseditoradmin/:id/:nombrecreador/:miuid/:minombrecreador", getNoticiaEditor)

//VER TODOS LOS EDITORES
router.get("/todosloseditoresadmin/:id/:nombrecreador", getEditores)


//PREGUNTA POR BORRAR EDITOR 
router.get('/borrareditor/:id/:uid/:nombrecreador', preguntaBorrarEditor)
//BORRAR EDITOR
router.get('/editorborrado/:id/:uid/:nombrecreador', borrarEditor)




module.exports = router