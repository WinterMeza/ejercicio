const {check} = require('express-validator');
const {validateResult} = require('../helper/validacionHelper');

const validacionIdHardware = [

    check('idhardware')
        .exists().withMessage('El ID Hardware no existe')
        .not()
        .notEmpty().withMessage('El ID Hardware no puedes estar vacío')
        .isLength({min: 11}).withMessage('El ID hardware debe ser de 11 carácteres')
        .matches(/^[0-9]\d{3}-[A-Z]{2}\d{4}$/).withMessage('El ID hardware debe ser en formato: 2301-AA2020'),
    (req, res, next) => {

        validateResult(req, res, next)

    }

]

module.exports = {validacionIdHardware}