const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario')
const {verificarToken,verificaAdminRole} = require('../middlewares/autenticacion')


app.get('/usuario', verificarToken ,function (req, res) {

    /* return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    }) */

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)


    Usuario.find({estado: true}, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec( (err,usuarios) =>{
                if (err) return res.status(400).json({ ok: false, err });

                Usuario.countDocuments({estado:true}, (err,conteo) =>{
                    res.json({
                        ok: true,
                        usuarios,
                        cantidad: conteo
                    })
                })

            })
});

app.post('/usuario', [verificarToken,verificaAdminRole], function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioBD) => {

        if (err) return res.status(400).json({ ok: false, err });
        
        res.json({ ok: true, usuario: usuarioBD}); 

    });
});

app.put('/usuario/:id', [verificarToken,verificaAdminRole],function (req, res) {
    
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'] );


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true } ,(err,usuarioDB) =>{
        
        if(err) return res.status(400).json({ok:false, err});

        res.json({ ok: true, usuario: usuarioDB });
    });

});

app.delete('/usuario/:id', [verificarToken,verificaAdminRole],function (req, res) {
    

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }


    //Usuario.findByIdAndRemove(id, (err,usuarioBorrado) => {
    Usuario.findOneAndUpdate(id,cambiaEstado,{ new: true},(err,usuarioBorrado) => {
        if(err) return res.status(400).json({ok:false, err});
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({ok:true,usuario:usuarioBorrado});
    })

});


module.exports = app;