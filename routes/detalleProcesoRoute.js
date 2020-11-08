const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getDetalleProcesos,
    crearDetalleProceso,
    actualizarDetalleProceso,
    eliminarDetalleProceso
} = require('../controllers/detalleProcesoController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getDetalleProcesos);


router.post('/', [
        validarJWT,
        check('abogado', 'El id del abogado debe ser valido').isMongoId(),
        check('proceso', 'El id del proceso debe ser valido').isMongoId(),
        validarCampos
    ],
    crearDetalleProceso);

router.put('/:id', [
        validarJWT,
        check('abogado', 'El id del abogado debe ser valido').isMongoId(),
        check('proceso', 'El id del proceso debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarDetalleProceso);

router.delete('/:id', validarJWT, eliminarDetalleProceso);



module.exports = router;