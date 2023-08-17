const getNoticia = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog/");
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





//BUSCA NOTICIA

const buscaNoticia = async (req, res) => {



    res.render("buscaNoticia.ejs", {
        titulo: "sección de noticias",
        

    })
    
}

const encontrarNoticia = async (req, res) => {
    
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/`, { method: "get" } );
        if (resp.ok) {
            
            const noticias = await resp.json();
           

            res.render("encontrarNoticia.ejs", {
                titulo: "sección de noticias",
                noticias: noticias.data
            })

        }}
     catch (error) {
        console.log(error);
    }

}

//CREAR CUENTA
const crearCuenta = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog");
        if (resp.ok) {
           

            res.render("nuevoUsuario.ejs", {
                titulo: "crea tu cuenta",
               
            })

        }
    } catch (error) {
        console.log(error);
    }

}

//CUENTACREADA

const cuentaCreada = async (req, res) => {
    
    const {  email, nombre, password, passConfirm} = req.body
    const body = {
        email,
        nombre,
        password,
        passConfirm
    }
    try {
        const resp = await fetch(`https://blog-agosto-back.onrender.com/api/v1/auth/register`, { method: "post", body: JSON.stringify(body),
        //EN LA DOCUMENTACION DE LA CLASE DE FETCH
        headers: {
            'Content-Type': 'application/json'
        } });
        if (resp.ok) {
            
            res.send("usuario creado")

        }
    } catch (error) {
        console.log(error);
    }

}

//LOGIN
const hacerLogin = async (req, res) => {

    try {
        const resp = await fetch("https://blog-agosto-back.onrender.com/api/v1/blog");
        if (resp.ok) {
           

            res.render("accesoUsuario.ejs", {
                titulo: "accede a tu cuenta",
               
            })

        }
    } catch (error) {
        console.log(error);
    }

}

//LOGEADO
const usuarioLogeado = async (req, res) => {
    
    const {  email, password} = req.body
    const body = {
        email,
        password
        
    }
    try {
        const resp = await fetch("http://localhost:3000/api/v1/auth/login/", { method: "post", body: JSON.stringify(body),
        //EN LA DOCUMENTACION DE LA CLASE DE FETCH
        headers: {
            'Content-Type': 'application/json'
        } });
        if (resp.ok) {
            const usuario = await resp.json();
            
            res.render("panelUsuario.ejs", {
                titulo: "PANEL USUARIO",
                usuario: usuario
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {

    getNoticia,
    buscaNoticia,
    encontrarNoticia, 
    crearCuenta, 
    cuentaCreada,
    hacerLogin,
    usuarioLogeado
}