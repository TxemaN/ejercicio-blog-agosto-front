const getNoticia = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog/");
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/noticiasEncontradasAdmin.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
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
    const creador=await req.params.creador;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${req.params.creador}`);
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/editorEncontradoAdmin.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
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
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog`, { method: "post", body: JSON.stringify(body),
        //EN LA DOCUMENTACION DE LA CLASE DE FETCH
        headers: {
            'Content-Type': 'application/json'
        } });
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
   
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`);
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("admin/editarNoticia.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

const noticiaEditada = async (req, res) => {
    
    const { titulo, noticia } = req.body
    const body = {
        titulo,
        noticia
    }
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.params.id}`, { method: "put", body: JSON.stringify(body),
        //EN LA DOCUMENTACION DE LA CLASE DE FETCH
        headers: {
            'Content-Type': 'application/json'
        } });
        if (resp.ok) {
            let noticias = await resp.json();
            
            console.log(noticias)
            res.send("noticia modificada")

        }
    } catch (error) {
        console.log(error);
    }

}

const borrarNoticia = async (req, res) => {
    

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/${req.params.id}`, { method: "delete" });
        if (resp.ok) {
            

            res.send("noticia eliminada")

        }
    } catch (error) {
        console.log(error);
    }

}

//METER FOTO
const subirFoto = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog");
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

//OBTENER TODOS LOS EDITOORE

const getEditores = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth");
        if (resp.ok) {
            const editores = await resp.json();

            res.render("admin/todosEditores.ejs", {
                titulo: "lista de editores",
                editores: editores.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}

//ELIMINAR EDITOR

const borrarEditor = async (req, res) => {
    

    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/auth/${req.params.id}`, { method: "delete" });
        if (resp.ok) {
            

            res.send("editor eliminado")

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
    borrarNoticia,
    subirFoto,
    fotoSubida,
    buscarNoticiaEditor,
    getNoticiaEditor,
    getEditores,
    borrarEditor
}