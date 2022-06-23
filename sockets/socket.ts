import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

//configurar usuarios //instancias es todo que ya tenemos solo que la ediatemos a qui
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket, io :socketIO.Server) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

   
}

export const deconectar = (cliente:Socket, io:socketIO.Server)  => {
    cliente.on('disconnect', () => {

        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

        //cuando se desconecta alguna persona de nuestro chat  // camvios en sever ya que se agrego el io
        io.emit('usuarios-activos', usuariosConectados.getLista());
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
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit('usuarios-activos', usuariosConectados.getLista()  );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}
//Obtener Usuarios //io es para emitirlo
export const obtenerUsuariosActivos = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {
        //to espara que solo se lo mande al cliente con id y no a todos es para
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
   
    });
}


