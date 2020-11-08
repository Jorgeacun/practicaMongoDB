const { response } = require('express');
const Juzgado = require('../models/juzgadoModel');

const getJuzgados = async(req, res = response) => {

    const juzgados = await Juzgado.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        juzgados
    });
}
const crearJuzgado = async(req, res = response) => {
    const uid = req.uid;

    const juzgado = new Juzgado({
        usuario: uid,
        ...req.body
    });

    try {

        const JuzgadoDB = await juzgado.save();
        res.json({
            ok: true,
            juzgado: JuzgadoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarJuzgado = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const juzgado = await Juzgado.findById(id);
        if (!juzgado) {
            return res.status(404).json({
                ok: true,
                msg: 'Juzgado no existe'

            });
        }

        const cambiosJuzgado = {
            ...req.body,
            usuario: uid
        }

        const juzgadoActualizado = await Juzgado.findByIdAndUpdate(id, cambiosJuzgado, { new: true });

        return res.json({
            ok: true,
            juzgado: juzgadoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarJuzgado = async(req, res = response) => {
    const id = req.params.id;

    try {

        const juzgado = await Juzgado.findById(id);
        if (!juzgado) {
            return res.status(404).json({
                ok: true,
                msg: 'Juzgado no existe'

            });
        }

        await Juzgado.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Juzgado Eliminado'

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
    getJuzgados,
    crearJuzgado,
    actualizarJuzgado,
    eliminarJuzgado
}