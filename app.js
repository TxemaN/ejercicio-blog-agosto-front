const express=require("express")
require("dotenv").config

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// CARPETA ESTÁTICA
app.use(express.static(__dirname + '/public'));


// MANTENER PUERTO A LA ESCUCHA
app.listen(port, () => {
    console.log(`servidor front a la escucha del puerto ${port}`);
});
