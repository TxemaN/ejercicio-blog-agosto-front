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


const {crearNoticiaEditor, noticiaCreadaEditor, getNoticiaEditor, getNoticiaOtroEditor, panelUsuario, noticiaEditada, preguntaBorrar, borrarNoticia, formatoEditar, encontrarNoticia, encontrarNoticiaAjena, getNoticia } = require("../controllers/editoController")

//PANEL USUARIO
router.get('/', panelUsuario)
//TODAS LAS NOTICIAS

router.get("/todasnoticias/:id/:nombrecreador", getNoticia)

//NOTICIAS EDITOR ESPECIFICO
router.get("/creadapor/:id/:nombrecreador/:uid/:minombrecreador", getNoticiaOtroEditor)
//NOTICIAS AJENAS

router.get("/buscadaAjena/:titulo/:id/:nombrecreador", encontrarNoticiaAjena)

//ENCONTRAR NOTICIA
router.get("/buscada/:titulo/:id/:nombrecreador", encontrarNoticia)
router.get("/creadapor/:id/:nombrecreador", getNoticiaEditor)

//CREAR NOTICIA
router.get("/crear/:id/:nombrecreador", crearNoticiaEditor)

//CREADA NOTICIA
router.post("/creada/",  upload.single('uploaded_file'), noticiaCreadaEditor)

//Mostrar el formulario de 'editar' pelicula
router.get('/editar/:id/:uid/:nombrecreador', formatoEditar)
//lanza la pelicula ya editada
router.post('/editada/:id/', upload.single('uploaded_file'), noticiaEditada)

//PREGUNTA POR BORRAR  
router.get('/borrar/:titulo/:uid/:nombrecreador', preguntaBorrar)
//lanza la pelicula ya borrada
router.get('/borrada/:id/:uid/:nombrecreador', borrarNoticia)

module.exports = router