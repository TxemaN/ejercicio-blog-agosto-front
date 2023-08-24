


//PANEL USUARIO
const panelUsuario = async (req, res) => {

    try {
        const creador = await Creador.find();
        return res.status(200).json({
            ok: true,
            msg: "lista de noticias",
            data: noticias

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el admin"

        });

    };
}

//NOTICIAS POR CREADOR

const getNoticiaEditor = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${uid}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = uid


            res.render("editor/noticiasEncontradasEditor.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,

                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}

const getNoticiaOtroEditor = async (req, res) => {
    const nombrecreador = req.params.nombrecreador;
    const uid = await req.params.uid;
    const nombreUsuario = req.params.minombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = uid
            res.render("editor/editorEncontrado.ejs", {
                titulo: `NOTICIAS ENVIADAS POR ${nombrecreador}`,
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}





//CREAR NOTCIA
const crearNoticiaEditor = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth/");
        if (resp.ok) {
            const idUsuario = uid

            res.render("editor/crearNoticiaEditor.ejs", {

                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })
            
        }
    } catch (error) {
        console.log(error);
    }

}

const noticiaCreadaEditor = async (req, res) => {

    const { titulo, noticia, imagensrc, imagenalt,  creador, nombrecreador } = req.body
    const body = {
        titulo,
        noticia,
        imagensrc,
        imagenalt,
        creador,
        nombrecreador
    }
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/`, {
            method: "post", body: JSON.stringify(body),
            //EN LA DOCUMENTACION DE LA CLASE DE FETCH
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {

            if (resp.ok) {
                const noticias = await resp.json();
            res.redirect(`/editor/creadapor/${noticias.noticia.creador}/${noticias.noticia.nombrecreador}`)
            }

        }
    } catch (error) {
        console.log(error);
    }

}

//EDITAR NOTICIAS

const formatoEditar = async (req, res) => {
    const uid = await req.params.uid;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();
            const idUsuario = uid
            res.render("editor/editarNoticia.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    } catch (error) {
        console.log(error);
    }

}

const noticiaEditada = async (req, res) => {

    const { titulo, noticia, imagensrc, imagenalt, uid, nombrecreador} = req.body
    const body = {
        titulo,
        noticia,
        imagensrc,
        imagenalt,
        uid,
        nombrecreador
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
            res.redirect(`/editor/creadapor/${noticias.noticia.creador}/${noticias.noticia.nombrecreador}`)
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
            res.render("editor/borrarNoticia.ejs", {
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



            res.redirect(`/editor/creadapor/${idUsuario}/${usuario}`)

        }
    } catch (error) {
        console.log(error);
    }

}
const encontrarNoticia = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.params.titulo}`, { method: "get" });
        if (resp.ok) {

            const noticias = await resp.json();
            const idUsuario = uid

            res.render("editor/noticiaIndividual.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario

            })

        }
    }
    catch (error) {
        console.log(error);
    }

}

const encontrarNoticiaAjena = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.params.titulo}`, { method: "get" });
        if (resp.ok) {

            const noticias = await resp.json();
            const idUsuario = uid;

            res.render("editor/noticiaIndividualAjena.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    }
    catch (error) {
        console.log(error);
    }

}

const getNoticia = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/`);
        if (uid) {

            const noticias = await resp.json();
            const idUsuario = uid;



            res.render("editor/noticiasEncontradas.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data,
                idUsuario: idUsuario,
                nombreUsuario: nombreUsuario
            })

        }
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = {


    crearNoticiaEditor,
    noticiaCreadaEditor,
    getNoticiaEditor,
    getNoticiaOtroEditor,
    panelUsuario,
    formatoEditar,
    noticiaEditada,
    preguntaBorrar,
    borrarNoticia,
    encontrarNoticia,
    encontrarNoticiaAjena,
    getNoticia,


}