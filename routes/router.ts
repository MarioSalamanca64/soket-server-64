import {Router,Request,Response} from 'express';

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

router.post('/mensajes/:id', (req:Request,res:Response) =>{

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de; 
    const id     = req.params.id;

    res.json({
      ok:true,
      cuerpo,
      de,
      id
    });

});


export default router;