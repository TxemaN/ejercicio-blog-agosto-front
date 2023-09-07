const express=require("express")
require("dotenv").config

const app = express();

const path = require('path');
const multer  = require('multer')




const cookieParser = require('cookie-parser');

app.use(cookieParser());
  
  


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())


const port = process.env.PORT||5000
// CARPETA ESTÁTICA
app.use(express.static(__dirname + '/public'));

// CONFIGURAR INGENIERIA DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views')); // set the views directory

// LLAMAR RUTAS FRONT
app.use("/", require("./routes/userRoutes"));
app.use("/editor", require("./routes/editorRoutes"));
app.use("/adminillo", require("./routes/adminRoutes"));



// MANTENER PUERTO A LA ESCUCHA
app.listen(port, () => {
    console.log(`servidor front a la escucha del puerto ${port}`);
});
