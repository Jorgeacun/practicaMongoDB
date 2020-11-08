const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getJuzgados,
    crearJuzgado,
    actualizarJuzgado,
    eliminarJuzgado
} = require('../controllers/juzgadoController');


const router = Router();

router.get('/', getJuzgados);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Juzgado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearJuzgado);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Juzgado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarJuzgado);

router.delete('/:id',
    validarJWT,
    eliminarJuzgado);



module.exports = router; //para exportar