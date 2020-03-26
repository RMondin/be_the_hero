const connection = require('../database/connection');

const create = async (req, res) => {
    const { titulo, descricao, valor } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
        titulo,
        descricao,
        valor,
        ong_id
    });

    return res.json({ id });
}

const getAll = async (req, res) => {


    const [count] = await connection('incidents').count();

    const { page = 1 } = req.query;
    const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf'
        ])

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
}


const remove = async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

    if (incident.ong_id != ong_id) {
        return res.status(401).json({ "error": "Operation not permitted" });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
}



module.exports = {
    create, getAll, remove
}