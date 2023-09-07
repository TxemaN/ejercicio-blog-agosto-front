/** Requerimos fetch@2 para poder despegar en render.com. */
const fetch = require("node-fetch")


/** Accede al panel de usuario, a través del cual se pueden acceder a las noticias propias y editarlas/borrarlas. */
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

/** Con esta función vemos las noticias creadas por un editor específico logeado. Requerimos el ID para las noticias y el nombre para que aparezca en el header */

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

/** Con esta función vemos las noticias creadas por otros editores, no se podrán editar. Requerimos el ID para las noticias y el nombre para que aparezca en el header */

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





/** Comprueba que el back para auth esté correcto y si es así redirige al ejs de crear noticia */
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
/** Una vez la noticia ha sido creada la sube a la base de datos. Imagen no utiliza multer todavía, sino la url */
const noticiaCreadaEditor = async (req, res) => {


    const { titulo, intronoticia, noticia, imagensrc, imagenalt, creador, nombrecreador } = req.body
    const body = {
        titulo,
        intronoticia,
        noticia,
        imagensrc: `uploads/${req.file.filename}`,
        imagenalt,
        creador,
        nombrecreador,
       
        
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


            const noticias = await resp.json();
            res.redirect(`/editor/creadapor/${noticias.noticia.creador}/${noticias.noticia.nombrecreador}`)


        }
    } catch (error) {
        console.log(error);
    }
console.log( imagensrc)
}
/** Esta función lleva a la sección de crear noticia, pero los campos ya están rellenados con los campos de la noticia original que se desea editar  */

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

/** Una vez la noticia ha sido editada, lleva a cabo un PUT para los siguientes campos del cuerpo en la BBDD */
const noticiaEditada = async (req, res) => {

    const { titulo, intronoticia, noticia, imagensrc, imagenalt, uid, nombrecreador } = req.body
    const body = {
        titulo,
        intronoticia,
        noticia,
        imagensrc: `uploads/${req.file.filename}`,
        imagenalt,
        uid,
        nombrecreador
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
            res.redirect(`/editor/creadapor/${noticias.noticia.creador}/${noticias.noticia.nombrecreador}`)
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

/** Una vez confirmada en el ejs de preguntarBorrar, lleva  acabo un delete sobbre el ID de la noticia*/
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

/** EJS que despliega una noticia específica del editor y permite editar/borrar */
const encontrarNoticia = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.titulo}`, { method: "get" });
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

/** EJS con la noticia de otros editor. No permite editar/borrar */

const encontrarNoticiaAjena = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.titulo}`, { method: "get" });
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

/** EJS con todas las noticias publicadas */
const getNoticia = async (req, res) => {
    const uid = await req.params.id;
    const nombreUsuario = req.params.nombrecreador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/`);
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