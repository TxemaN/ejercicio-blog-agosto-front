const express = require("express");
const router = express.Router();


const {crearNoticiaEditor, noticiaCreadaEditor, getNoticiaEditor, panelUsuario, noticiaEditada, borrarNoticia, formatoEditar } = require("../controllers/editoController")

//PANEL USUARIO
router.get('/', panelUsuario)
//VER NOTICIA DEL EDITOR
router.get("/creadapor/:id", getNoticiaEditor)

//CREAR NOTICIA
router.get("/crear/:id", crearNoticiaEditor)

//CREADA NOTICIA
router.post("/creada/", noticiaCreadaEditor)

//Mostrar el formulario de 'editar' pelicula
router.get('/editar/:id', formatoEditar)
//lanza la pelicula ya editada
router.post('/editada/:id', noticiaEditada)

//lanza la pelicula ya borrada
router.get('/borrar/:id', borrarNoticia)

module.exports = router