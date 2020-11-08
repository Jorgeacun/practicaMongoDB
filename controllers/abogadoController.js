const { response } = require('express');
const Abogado = require('../models/abogadoModel');

const getAbogados = async(req, res = response) => {

    const abogados = await Abogado.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        abogados
    });
}
const crearAbogado = async(req, res = response) => {
    const uid = req.uid;

    const abogado = new Abogado({
        usuario: uid,
        ...req.body
    });

    try {

        const abogadoDB = await abogado.save();
        res.json({
            ok: true,
            abogado: abogadoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarAbogado = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const abogado = await Abogado.findById(id);
        if (!abogado) {
            return res.status(404).json({
                ok: true,
                msg: 'Abogado no existe'

            });
        }

        const cambiosAbogado = {
            ...req.body,
            usuario: uid
        }

        const abogadoActualizado = await Abogado.findByIdAndUpdate(id, cambiosAbogado, { new: true });

        return res.json({
            ok: true,
            abogado: abogadoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarAbogado = async(req, res = response) => {
    const id = req.params.id;

    try {

        const abogado = await Abogado.findById(id);
        if (!abogado) {
            return res.status(404).json({
                ok: true,
                msg: 'Abogado no existe'

            });
        }

        await Abogado.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Abogado Eliminado'

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
    getAbogados,
    crearAbogado,
    actualizarAbogado,
    eliminarAbogado
}