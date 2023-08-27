const express = require("express");
const router = express.Router();




const {getNoticia, getNoticiaEditor,  encontrarNoticia, crearCuenta, cuentaCreada, hacerLogin, usuarioLogeado} = require("../controllers/userController")

router.get("/", getNoticia)

//NOTICIAS EDITOR ESPECIFICO
router.get("/creadapor/:id/:nombrecreador", getNoticiaEditor)



//ENCONTRAR NOTICIA
router.get("/buscada/:titulo", encontrarNoticia)

//CREAR CUENTA
router.get("/crearcuenta/", crearCuenta)

//CUENTACREADA
router.post("/cuentacreada/", cuentaCreada)

//acceder a la cuenta
router.get("/accedercuenta/", hacerLogin)

//Usuario logeado
router.post("/cuentalogeada/", usuarioLogeado)




module.exports = router