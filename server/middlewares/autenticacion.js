const jwt = require('jsonwebtoken');

//====================VERIFICAR TOKEN =======================
let verificarToken = (req, res,next) => {
    let token = req.get('token'); //autorization

    jwt.verify(token, process.env.SEED, (err,decoded)=>{
        if(err) return res.status(401).json({ok:false,err: {message: 'Token no válido'}});

        req.usuario= decoded.usuario;
        next();
    });
}

//================Verificar ADMIN_ROLE=============================
let verificaAdminRole = (req,res,next) => {
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE') next();
    else return res.json({ok:false,err:{message:'El usuario no es administrador'}});
}


module.exports = {
    verificarToken,
    verificaAdminRole
}