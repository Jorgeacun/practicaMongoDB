const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getAbogados,
    crearAbogado,
    actualizarAbogado,
    eliminarAbogado
} = require('../controllers/abogadoController');


const router = Router();

router.get('/', getAbogados);


router.post('/', [
        validarJWT,
        check('colegiatura', 'la colegiatura del Abogado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAbogado);

router.put('/:id', [
        validarJWT,
        check('colegiatura', 'la colegiatura del Abogado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarAbogado);

router.delete('/:id',
    validarJWT,
    eliminarAbogado);



module.exports = router;