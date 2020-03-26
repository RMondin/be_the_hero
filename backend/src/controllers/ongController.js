const connection = require('../database/connection');
const crypto = require('crypto');

const create = async (req, res) => {
    const { nome, email, whatsapp, cidade, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf,
    }).catch(err => {
        console.log(err);
    });

    return res.json({ id });
};

const getAll = async (req, res) => {
    const ongs = await connection('ongs').select('*');

    res.json(ongs);
};

const remove = async (req, res) => {
    return res.json({"func":"REMOVE"});
}




module.exports = {
    create, getAll, remove
}