//servidor en todo este archivo
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const favicon = require('serve-favicon');

const app = express();
//conectar a la BD,si no existe se crea automaticamente
mongoose.connect('mongodb://localhost/pelisplusplus').then(db=>console.log('conexión a la BD   realizada correctamente'))
.catch(err=>console.error('Ha ocurrido un error: '+err));
//importar rutas
const indexRoutes = require('./routes/index');
//const { Console } = require('console');
//configuraciones
app.set('port',process.env.PORT || 3000);//arrancar en el puerto que asigna el SO o el 3000 si no hay
app.set('views',path.join(__dirname,'views'));//Join prun sara que no importe SO del server
app.set('view engine','ejs');
//middlewares
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));//enteder solicitudes que mandan, extended:false porque no se enviaran archivos grandes
//rutas
app.use('/',indexRoutes);
app.use(favicon(path.join(__dirname,'/views/partials/favicon.ico')));
//empezando servidor
app.listen(app.get('port'), () =>{
console.log(`Server on port ${app.get('port')}`);//`= ALTGR + }
});