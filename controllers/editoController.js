


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
    const uid=await req.params.id;
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/blog/creadapor/${uid}`);
        if (resp.ok) {
            const noticias = await resp.json();

            res.render("editor/noticiasEncontradasEditor.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }
    } catch (error) {
        console.log(error);
    }

}






//CREAR NOTCIA
const crearNoticiaEditor = async (req, res) => {
    const creador= req.params.id;
    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/auth/");
        if (resp.ok) {
           

            res.render("editor/crearNoticiaEditor.ejs", {
                
             creador:creador
            })

        }
    } catch (error) {
        console.log(error);
    }

}

const noticiaCreadaEditor = async (req, res) => {
    
    const { titulo, noticia, imagen,creador } = req.body
    const body = {
        titulo,
        noticia,
        imagen,
        creador
    }
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/`, { method: "post", body: JSON.stringify(body),
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

//EDITAR NOTICIAS

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

module.exports = {

    
    crearNoticiaEditor,
    noticiaCreadaEditor,
    getNoticiaEditor,
    panelUsuario,
    formatoEditar,
    noticiaEditada,
    borrarNoticia
    
}