import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
//configurar usuarios //instancias es todo que ya tenemos solo que la ediatemos a qui
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}

export const deconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {

        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

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
// Configurar usuario para mostrar el nombre
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (payload:{nombre:string},callback:Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)

        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre}, configuracion`
        });
   

    });
}

