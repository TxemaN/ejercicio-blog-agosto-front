/** Requerimos fetch@2 para poder despegar en render.com. */
const fetch = require("node-fetch")

/** Obtiene todas las noticias y permite editarlas o borrarlas */
const getNoticia = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/`);
        if (uid == "64de290af975e85240b8dfda") {
            const noticias = await resp.json();
            const idUsuario = uid;
            res.render("admin/noticiasEncontradasAdmin.ejs", {
                titulo: "LISTA DE NOTICIAS",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** Al hacer click sobre el nombre del autor en la noticia activa getNoticiaEditor. */
const buscarNoticiaEditor = async (req, res) => {

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/`);
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/buscarEditor.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** Si buscarNoticiaEditor funciona correctamente, despliega todas las noticias del editor. */
const getNoticiaEditor = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    const idAdmin = await req.params.miuid;
    const nombreAdmin = req.params.minombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = idAdmin;
            res.render("admin/editorEncontradoAdmin.ejs", {
                titulo: `NOTICIAS ENVIADAS POR ${nombreUsuario}`,
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreAdmin,

            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** Comprueba que el back para auth esté correcto y si es así redirige al ejs de crear noticia */
const crearNoticia = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog");
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/crearNoticia.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** Una vez la noticia ha sido creada la sube a la base de datos. Imagen no utiliza multer todavía, sino la url */
const noticiaCreada = async (req, res) => {

    const { titulo, noticia, imagen, creador } = req.body
    const body = {
        titulo,
        noticia,
        imagen,
        creador
    }
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog`, {
            method: "post", body: JSON.stringify(body),
            //EN LA DOCUMENTACION DE LA CLASE DE FETCH
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {

            const noticias = await resp.json();

            res.send("noticia creada")
            console.log(noticias)

        }
    } catch (error) {
        console.log(error);
    }

}
/** Esta función lleva a la sección de crear noticia, pero los campos ya están rellenados con los campos de la noticia original que se desea editar  */
const formatoEditar = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    const idAdmin = await req.params.miuid;
    const nombreAdmin = req.params.minombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = uid
            res.render("admin/editarNoticia.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario,
                idAdmin: idAdmin,
                nombreAdmin: nombreAdmin

            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** Una vez la noticia ha sido editada, lleva a cabo un PUT para los siguientes campos del cuerpo en la BBDD */
const noticiaEditada = async (req, res) => {

    const { titulo, intronoticia, noticia, imagensrc, imagenalt, uid, nombrecreador, idAdmin, nombreAdmin } = req.body
    const body = {
        titulo,
        noticia,
        intronoticia,
        imagensrc: `uploads/${req.file.filename}`,
        imagenalt,
        uid,
        nombrecreador,
        idAdmin,
        nombreAdmin
    }
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`, {
            method: "put", body: JSON.stringify(body),

            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            const noticias = await resp.json();
            res.redirect(`/adminillo/todasnoticiasadmin/${body.idAdmin}/${body.nombreAdmin}`)
            console.log(noticias)

        }
    } catch (error) {
        console.log(error);
    }

}

/** EJS con la noticia a borrar y la pregunta de confirmación */
const preguntaBorrar = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.titulo}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = uid
            res.render("admin/borrarNoticia.ejs", {
                titulo: "ELIMINAR NOTICIA",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** Una vez confirmada en el ejs de preguntarBorrar, lleva  acabo un delete sobbre el ID de la noticia*/
const borrarNoticia = async (req, res) => {

    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`, { method: "delete" });
        if (resp.ok) {
            const idUsuario = uid;
            const usuario = nombreUsuario



            res.redirect(`/adminillo/todasnoticiasadmin/${idUsuario}/${usuario}`)

        }
    } catch (error) {
        console.log(error);
    }

}

/** PRUEBA PARA METER LA FOTO CON MULTER, LOGRO SUBIRLA A LOCAL PERO NO PASARLA A BBDD*/
const subirFoto = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog",);
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/subirFoto.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** PRUEBA PARA METER LA FOTO CON MULTER, LOGRO SUBIRLA A LOCAL PERO NO PASARLA A BBDD*/
const fotoSubida = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog");
        if (resp.ok) {
            res.send("foto subida")

        }
    } catch (error) {
        console.log(error);
    }

}

/** Lista con todos los editores que muestra la opción de borrarlos*/

const getEditores = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth");
        if (uid == "64de290af975e85240b8dfda") {
            const editores = await resp.json();
            const idUsuario = uid;
            res.render("admin/todosEditores.ejs", {
                titulo: "lista de editores",

                editores: editores.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}
/** EJS con el editor a eliminar y la pregunta de confirmación */
const preguntaBorrarEditor = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/auth/${req.params.id}`);
        if (resp.ok) {
            const editores = await resp.json();
            const idUsuario = uid
            res.render("admin/borrarEditor.ejs", {
                titulo: "ELIMINAR EDITOR",

                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario,
                editores: editores.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

/** Una vez confirmada en el ejs de preguntarBorrarEditor, lleva  acabo un delete sobbre el ID del creador*/

const borrarEditor = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/auth/${req.params.id}`, { method: "delete" });
        if (resp.ok) {
            const idUsuario = uid;
            const usuario = nombreUsuario;
            res.redirect(`/adminillo/todosloseditoresadmin/${idUsuario}/${usuario}`)

        }
    } catch (error) {
        console.log(error);
    }

}



module.exports = {

    getNoticia,
    crearNoticia,
    noticiaCreada,
    formatoEditar,
    noticiaEditada,
    preguntaBorrar,
    borrarNoticia,
    subirFoto,
    fotoSubida,
    buscarNoticiaEditor,
    getNoticiaEditor,
    getEditores,
    preguntaBorrarEditor,
    borrarEditor
}