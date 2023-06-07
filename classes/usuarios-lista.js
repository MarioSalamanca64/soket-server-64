import { Usuario } from "./usuario";

export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor(){}
    //agregar un usuario
    public agregar(usuario:Usuario){

        this.lista.push(usuario);
        console.log(this.lista)
        return usuario;
    }
    
    public actualizarNombre(id:string, nombre:string){
        //almomento de crearlo tenemos que saber que id contienen 
        for(let usuario of this.lista){

            if(usuario.id === id){
                usuario.nombre = nombre
                //salir de ciclo for 
                break
            }
        }
        console.log('===== Actualizando usuario ======');
        console.log(this.lista);
    }
    //Obtener lista de ususarios
    public getLista(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    //obtener solo un usuario
    public getUsuario(id:string){
        //find devuelve el primer valor dela matris o array
        return this.lista.find(usuario => usuario.id === id);
    }
    //obtener usuarios en una sala en particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    //borrar un usuario o quitar cuando se descoencta de nuestro chat
    public borrarUsuario(id:any){
        
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter(usuario =>  usuario.id !== id);
        //lista de los que estan conectados
       //console.log(this.lista)

        return tempUsuario;
    }
}