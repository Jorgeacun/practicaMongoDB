const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getProcesos,
    crearProceso,
    actualizarProceso,
    eliminarProceso
} = require('../controllers/procesoController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getProcesos);


router.post('/', [
        validarJWT,
        check('descripcion', 'la descripcion del proceso es obligatorio').not().isEmpty(),
        check('juzgado', 'El id del juzgado debe ser valido').isMongoId(),
        validarCampos
    ],
    crearProceso);

router.put('/:id', [
        validarJWT,
        check('descripcion', 'la descripcion del proceso es obligatorio').not().isEmpty(),
        check('juzgado', 'El id del juzgado debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarProceso);

router.delete('/:id', validarJWT, eliminarProceso);



module.exports = router;