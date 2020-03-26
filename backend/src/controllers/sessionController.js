const connection = require('../database/connection');


const create = async (req, res) => {
    const { id } = req.body;
    const ong = await connection('ongs')
        .where('id', id)
        .select('nome')
        .first();

    if (!ong) {
        res.status(400).json({ "error": "Nenhuma ONG encontrada com este ID" });
    }

    return res.json(ong);
}


module.exports = {
    create
}