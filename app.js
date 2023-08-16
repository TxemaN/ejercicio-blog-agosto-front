const express=require("express")
require("dotenv").config

const app = express();


const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



const cookieParser = require('cookie-parser');

app.use(cookieParser());
  
  app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
  
  const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
  app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
  })



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

// LLAMAR RUTAS FRONT
app.use("/", require("./routes/userRoutes"));
app.use("/editor", require("./routes/editorRoutes"));
app.use("/admin", require("./routes/adminRoutes"));



// MANTENER PUERTO A LA ESCUCHA
app.listen(port, () => {
    console.log(`servidor front a la escucha del puerto ${port}`);
});
