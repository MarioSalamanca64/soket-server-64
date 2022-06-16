import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';



export default class Server{
    //_intance es de la mismapropiedad del server es una funcion estatica y se puede llamar del mismo server 
    private static _intance: Server;

    public app: express.Application;
    public port:number;
    //propiedad encargada de emitir eventos
    public io!: socketIO.Server;
    //laconexion entre express y socket io este es el servidor que lo levantara y no el app 
    private httpServer!: http.Server;
    //se usa private porque no queremos que se duplique el io o los sokets 
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        //io es el servidor que personas estan conectadas
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.escucharSockets();
    }
    //cuando quieran usar la instacia del metodo server se retornara aqui
    public static get instance(){
        //si  existe si no existe una instacia  si no que regrese un new server osea una nueva 
        return this._intance || (this._intance = new this());   
    }

    private escucharSockets(){

        console.log('Escuchando coneciones - sockets');
        //on que esta conectado
        this.io.on('connection', cliente => {

            console.log('Cliente conectado');

            //Mensajes
            socket.mensaje(cliente, this.io);
            //desconectar    
            socket.deconectar(cliente);    
            
        });



    }


    start( callback: any){
        //con eso le desimos que comiense el servidor 
        this.httpServer.listen(this.port , callback);
    }




}