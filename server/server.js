require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//settings



//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Configuracion global de rutas
app.use( require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true } ,(err,resp)=>{
    if(err) throw err;

    console.log('Base de datos ONLINE');
    
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);

})