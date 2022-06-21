import {Router,Request,Response} from 'express';
import Server from '../classes/server';


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


export default router;