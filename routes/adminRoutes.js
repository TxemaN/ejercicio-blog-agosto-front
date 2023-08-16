const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {formatoEditar, getNoticia, noticiaEditada, borrarNoticia, crearNoticia, noticiaCreada,subirFoto,fotoSubida, getNoticiaEditor, buscarNoticiaEditor, getEditores, borrarEditor} = require("../controllers/adminController")

//SUBIR IMAGEN

router.get("/subir/", subirFoto)

//IMAGEN SUBIDA

router.post('/profile', upload.single('imagen'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body)
    res.send("foto subida")
  } )

//CREAR NOTICIA
router.get("/crear/", crearNoticia)

//CREADA NOTICIA
router.post("/creada/", noticiaCreada)


//Mostrar el formulario de 'editar' pelicula
router.get('/editar/:id', formatoEditar)

//lanza la pelicula ya editada
router.post('/editada/:id', noticiaEditada)

//lanza la pelicula ya borrada
router.get('/borrar/:id', borrarNoticia)

router.get("/", getNoticia)
router.get("/buscareditor/", buscarNoticiaEditor)

router.get("/noticiaseditor/:creador", getNoticiaEditor)

//VER TODOS LOS EDITORES
router.get("/todosloseditores", getEditores)

//BORRAR EDITOR
router.get('/borrareditor/:id', borrarEditor)




module.exports = router