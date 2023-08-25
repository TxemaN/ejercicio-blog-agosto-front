const fetch = require("node-fetch")

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
//BUSCAR EDITOR
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

//NOTICIAS POR EDITOR
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
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreAdmin,
               
            })

        }
    } catch (error) {
        console.log(error);
    }

}
//CREAR NOTCIA
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
                nombreAdmin:nombreAdmin

            })

        }
    } catch (error) {
        console.log(error);
    }

}

const noticiaEditada = async (req, res) => {

    const { titulo, noticia, imagensrc, imagenalt, uid, nombrecreador, idAdmin, nombreAdmin } = req.body
    const body = {
        titulo,
        noticia,
        imagensrc,
        imagenalt,
        uid,
        nombrecreador,
        idAdmin, 
        nombreAdmin
    }
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.params.id}`, {
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

//METER FOTO
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

//FOTO SUBIDA
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

//OBTENER TODOS LOS EDITORES

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
//PREGUNTAR BORRAR EDITOR
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

//ELIMINAR EDITOR

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