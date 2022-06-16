import { Socket } from 'socket.io';
import socketIO from 'socket.io';



export const deconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}
//escuchar mensajes del front
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', (payload:{de:string , cuerpo:string}) => {

        console.log('Mensaje recibido', payload);
        //para que escuchen todos los que estan conectados
        //mensaje-nuevo debe ser el mismo que en el front
        io.emit('mensaje-nuevo', payload);

    });

}

