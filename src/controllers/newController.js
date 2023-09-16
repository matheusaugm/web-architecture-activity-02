import { db } from '../config/db.js';

export const insertImage = (req, res) => {
    const image = req.body.fileItem;
    const title = req.body.titulo;
    const sinopse = req.body.sinopse;
    const duracao = req.body.duracao;
    const data_lancamento = req.body.data_lancamento;

    const query = 'INSERT INTO `movies` (titulo, sinopse, duracao, imagem, dataLancamento) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [title, sinopse, duracao, image, data_lancamento], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
        }

        // A resposta é enviada apenas após o sucesso da inserção no banco de dados.
        return res.json({ message: 'Filme inserido com sucesso!' });
    });
};
