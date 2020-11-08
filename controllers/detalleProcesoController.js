const { response } = require('express');
const DetalleProceso = require('../models/detalleProceso');

const getDetalleProcesos = async(req, res = response) => {
    const detalleProcesos = await DetalleProceso.find().
    populate('usuario', 'nombre img').
    populate('abogado', 'nombres').
    populate('proceso', 'descripcion');

    res.json({
        ok: true,
        detalleProcesos
    });
}
const crearDetalleProceso = async(req, res = response) => {
    const uid = req.uid;

    const detalleProceso = new DetalleProceso({
        usuario: uid,
        ...req.body
    });

    try {

        const DetalleProcesoDB = await detalleProceso.save();
        res.json({
            ok: true,
            detalleProceso: DetalleProcesoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarDetalleProceso = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const detalleProceso = await DetalleProceso.findById(id);
        if (!detalleProceso) {
            return res.status(404).json({
                ok: true,
                msg: 'DetalleProceso no existe'

            });
        }

        const cambiosDetalleProceso = {
            ...req.body,
            usuario: uid
        }

        const detalleProcesoActualizado = await DetalleProceso.findByIdAndUpdate(id, cambiosDetalleProceso, { new: true });

        return res.json({
            ok: true,
            detalleProceso: detalleProcesoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarDetalleProceso = async(req, res = response) => {
    const id = req.params.id;

    try {

        const detalleProceso = await DetalleProceso.findById(id);
        if (!detalleProceso) {
            return res.status(404).json({
                ok: true,
                msg: 'DetalleProceso no existe'

            });
        }

        await DetalleProceso.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'DetalleProceso Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getDetalleProcesos,
    crearDetalleProceso,
    actualizarDetalleProceso,
    eliminarDetalleProceso
}