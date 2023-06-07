import {Router,Request,Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

//resquest es lo que le pides al servidor 
//la response es lo que te manda 

//creacion de rutas api
//router es lo que ocuparemos para crear nuestras api endpoins o nuestro rest
export const router = Router();
//en la segunda parte ese el hander que resive una funcion
router.get('/mensajes', (req:Request,res:Response) =>{

    res.json({
      ok:true,
      mensaje:'Todo esta bien'
    });

});

router.post('/mensajes', (req:Request,res:Response) =>{

  const cuerpo = req.body.cuerpo;
  const de     = req.body.de; 

  const payload = {
    cuerpo,
    de
  }

  const server = Server.instance;

  server.io.emit('mensaje-nuevo', payload)

  res.json({
    ok:true,
    cuerpo,
    de,
  });

});

router.post('/mensajes/:id', (req:Request,res:Response) =>{

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de; 
    const id     = req.params.id;

    

    //payload mensaje que se en viara auna sola persona 
    const payload = {
        de,
        cuerpo
    }
    //servisio rest ya que solo mandaremos mensajes a una sola perona o privado
    const server = Server.instance;
    //in solo para madar el menmsaje auna persona en particular
    server.io.in( id ).emit('mensajes-privado',payload);
    //mandar a todo el mundo
    //server.io.emit('mensajes-privado',payload);


    res.json({
      ok:true,
      cuerpo,
      de,
      id
    });

});

//Servicio para obtener todos los IDs de los usuarios 
router.get('/usuarios',async (req: Request, res: Response) => {
  //nueva instacia de nuestro servidor
  const server = Server.instance;

  await server.io.fetchSockets().then((sockets) => {

      res.json({
          ok: true,
          // clientes
          clientes: sockets.map( cliente => cliente.id)
      });

  }).catch((err) => {

      res.json({
          ok: false,
          err
      })
  });
});

//obtener usuarios y sus nombres
router.get('/usuarios/detalle',async (req: Request, res: Response) => {

   

  res.json({
    ok: false,
    clientes: usuariosConectados.getLista() 
  });
});



export default router;