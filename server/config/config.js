process.env.PORT = process.env.PORT || 3000//app.set('port', process.env.PORT || 3000);


//======Entorno=========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//=================Google clinet ID=========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '985556997715-604q0vrrh8ujbt14pqubic77n0f3pkfa.apps.googleusercontent.com';

//===========Vensimiento del token============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60*60*24*30;


//==============SEED (semilla) de autenticacion====================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

//============Base de datos=================

let urlDB;

if( process.env.NODE_ENV === 'dev' ) urlDB = 'mongodb://localhost:27017/cafe';
else urlDB= process.env.MONGO_URI;

process.env.URLDB = urlDB;
