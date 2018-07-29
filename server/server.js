require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

//settings



//Middlewares
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//Habilitar la carpeta public
app.use(express.static( path.resolve( __dirname, '../public' )));


//Configuracion global de rutas
app.use( require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true } ,(err,resp)=>{
    if(err) throw err;

    console.log('Base de datos ONLINE');
    
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);

})