const {validationResult} = require('express-validator')

const validateResult = (req, res, next) => {

    try{

        validationResult(req).throw()
        return next(); //Si todo esta bien en las validaciones sigue su curso la app

    }catch(err){

        res.status(403).send({errors: err.array()}) //Si hay un error nos retorna el error

    }

}

module.exports = {validateResult}