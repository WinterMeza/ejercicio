const express = require('express');
const {agg} = require('../repositorio/historial');
const {validacionIdHardware} = require('../middleware/validacionComputadora');

//TRAEMOS EL ENRUTAMIENTO DE EXPRESS
const api = express.Router();

let repo = []; //INICIALIZAMOS LA VARIABLE REPO, AQUI SE GUARDAN LOS DATOS

//CREAMOS RUTA PARA EL POST
api.post('/registrar', validacionIdHardware, (req, res) => {

    const body = req.body;

    agg(body, repo); //SI TODO ESTA BIEN SE AGREGA AL REPOSITORIO CREADO CON LA FUNCION AGG

    return res.status(200).send({

        data: body, //NOS ENVIA LO QUE INGRESAMOS EN EL BODY
        message: 'Dato almacenado correctamente! :)' //NOS ENVIA UN MENSAJE DE CONFIRMACION

    })

});

//CREAMOS RUTA PARA EL GET por id de hardware
api.get('/:idhardware', (req, res) => {

    
    const {idhardware} = req.params;

    let computadora = repo.filter(h => h.idhardware === idhardware);
    console.log(computadora);

    if(computadora.length===0)
    {

        res.status(400).send({
            message: 'No se encontro computadora con ese ID'
        })

    } else {

        res.status(200).send({
            message: 'Computadora encontrada con éxito',
            pc: repo[0]
        })

    }
    

})

//CREAMOS RUTA PARA EL GET y nos enliste todas las computadoras
api.get('/', (req, res) => {

    
    res.status(200).send(repo);
    

})

//CREAMOS RUTA PARA EL PUT para actualizar computadoras
api.put('/:idhardware', (req, res) => {

    
    const {idhardware} = req.params;
    const body = req.body;

    if(idhardware){

        let computadora = repo.filter(h => h.idhardware === idhardware)[0]

        computadora.nombre = body.nombre;
        computadora.marca = body.marca;
        computadora.npiezas = body.npiezas;
        computadora.fechaIngreso = body.fechaIngreso;
    
        res.status(200).send({
            pc: body,
            message: 'Computadora actualizada con éxito'
        })

    }else {

        res.status(400).send({
            message: 'No se encontró computadora con ese ID'
        })

    }

})

//CREAMOS RUTA PARA EL DELETE para eliminar computadoras
api.delete('/:idhardware', (req,res)=>{
    const { idhardware } =  req.params;
    repo = repo.filter(h => h.idhardware !== idhardware);
    res.status(200).send({
        message:`Computadora eliminada con éxito`
    })

})

module.exports = api;