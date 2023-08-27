/** Requerimos fetch@2 para poder despegar en render.com. */
const fetch = require("node-fetch")
/** Función para obtener todas las noticias en la página inicial. */
const getNoticia = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog/", { method: "get" });
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("noticiasEncontradas.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** Con esta función vemos las noticias creadas por un editor específico. Requerimos el ID para las noticias y el nombre para que aparezca en el header */
const getNoticiaEditor = async (req, res) => {
    const minombrecreador = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();
            
            res.render("editorEncontrado.ejs", {
                titulo: `NOTICIAS ENVIADAS POR ${minombrecreador}`,
                noticias: noticias.data,
                
            })

        }
    } catch (error) {
        console.log(error);
    }

}



/** Encuentra la noticia por título y abre la versión larga de la misma al hacer click en el título */


const encontrarNoticia = async (req, res) => {

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.titulo}`, { method: "get" });
        if (resp.ok) {

            const noticias = await resp.json();


            res.render("noticiaIndividual.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    }
    catch (error) {
        console.log(error);
    }

}

/** Encuentra noticias que contengan palabras introducidas en el formulario de búsqueda. */
const encontrarNoticias = async (req, res) => {

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/`, { method: "post" });
        if (resp.ok) {

            const noticias = await resp.json();


            res.render("noticiasEncontradas.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    }
    catch (error) {
        console.log(error);
    }

}

/** Comrpueba que la parte del back de autenticación esté correcta y dirije al ejs de crear usuario. */
const crearCuenta = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth");
        if (resp.ok) {


            res.render("nuevoUsuario.ejs", {
                titulo: "crea tu cuenta",

            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** Una vez creada la cuenta recoge el email, nombre y password el usuario para añadirlo a la BBDD. */

const cuentaCreada = async (req, res) => {

    const { email, nombre, password, passConfirm } = req.body
    const body = {
        email,
        nombre,
        password,
        passConfirm
    }
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/auth/register`, {
            method: "post", body: JSON.stringify(body),
            //EN LA DOCUMENTACION DE LA CLASE DE FETCH
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {

            res.send("usuario creado")

        }
    } catch (error) {
        console.log(error);
    }

}

/** Comrpueba que la parte del back de autenticación esté correcta y dirije al ejs del login. */
const hacerLogin = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth");
        if (resp.ok) {


            res.render("accesoUsuario.ejs", {
                titulo: "accede a tu cuenta",

            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** Requiere el mail de usuario y la contraseña, si coinciden con la BBDD genera el token y comprueba el rol. */
const usuarioLogeado = async (req, res) => {

    const { email, password} = req.body
    const body = {
        email,
        password,
  }
    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth/login", {
            method: "post", body: JSON.stringify(body),

            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            

            const usuario = await resp.json();
            console.log(usuario.token)
            if (usuario.role == "admin") {

                res.render("admin/panelAdmin.ejs", {
                    titulo: "PANEL ADMINISTRADOR",
                    usuario: usuario
                })
                

            } else {
                res.render("panelUsuario.ejs", {
                    titulo: "PANEL USUARIO",
                    usuario: usuario
                })
            }
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {

    getNoticia,
    getNoticiaEditor,
   
    encontrarNoticia,
    encontrarNoticias,
    crearCuenta,
    cuentaCreada,
    hacerLogin,
    usuarioLogeado
}