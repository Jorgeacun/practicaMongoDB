const { response } = require('express');
const Proceso = require('../models/procesoModel');

const getProcesos = async(req, res = response) => {
    const procesos = await Proceso.find().
    populate('usuario', 'nombre img').
    populate('juzgado', 'tipo descripcion');

    res.json({
        ok: true,
        procesos
    });
}
const crearProceso = async(req, res = response) => {
    const uid = req.uid;

    const proceso = new Proceso({
        usuario: uid,
        ...req.body
    });

    try {

        const procesoDB = await proceso.save();
        res.json({
            ok: true,
            proceso: procesoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarProceso = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const proceso = await Proceso.findById(id);
        if (!proceso) {
            return res.status(404).json({
                ok: true,
                msg: 'Proceso no existe'

            });
        }

        const cambiosProceso = {
            ...req.body,
            usuario: uid
        }

        const ProcesoActualizado = await Proceso.findByIdAndUpdate(id, cambiosProceso, { new: true });

        return res.json({
            ok: true,
            proceso: ProcesoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarProceso = async(req, res = response) => {
    const id = req.params.id;

    try {

        const proceso = await Proceso.findById(id);
        if (!proceso) {
            return res.status(404).json({
                ok: true,
                msg: 'Proceso no existe'

            });
        }

        await Proceso.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Proceso Eliminado'

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
    getProcesos,
    crearProceso,
    actualizarProceso,
    eliminarProceso
}