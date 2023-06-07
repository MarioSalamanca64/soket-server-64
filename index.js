//instalaciones 
//body-parse
//cors
//express


//iniciar ts en este proyecto
//tsc --init

//configuracion del archivo tsconfig
//module es6 
//"outDir: "dist/"

//correr nuestro codigo de ts en consola
//tsc -w = poner el modo watch observar 
//en otra terminal misma ruta del proyecto
//nodemon dist/

const Server = require('./classes/server');
const router = require('./routes/router');
const bodyPaser = require( 'body-parser');
const cors = require('cors');




const server  = Server.instance;

//antes de las rutas bodyparse trasorma el formato para que quede como un objeto lo que sea que me manden siempre regresalo como un objeto de js
server.app.use(bodyPaser.urlencoded({extended:true}));
//trasforme en un json 
server.app.use(bodyPaser.json());

// CORS para que acepte las peticiones a nuestro back con figurado para cualquier persona

server.app.use(cors({origin:true,credentials:true}));

//rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})