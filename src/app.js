import express from 'express';
import { db } from './config/db.js';
import dotenv from 'dotenv';
import multer from 'multer';
import { insertImage } from './controllers/newController.js';

const app = express();
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM `movies` WHERE cod = ?';

    db.query(query, [id], function (err, results, fields) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        res.json(results[0]); // Envia o primeiro resultado como resposta no formato JSON
    });
});

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM `movies`', function (err, results, fields) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        }
        res.json(results); // Envia os resultados como resposta no formato JSON
    });
});

app.get('/', (req, res) => {
    console.log(process.env);

    db.query('SELECT * FROM `movies`', function (err, results, fields) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        }
        res.render('upload', { base64Image: null });
    });
});

app.post('/upload', upload.single('image'), (req, res) => {
    // Converte a imagem para base64
    const base64Image = req.file.buffer.toString('base64');
    req.body.fileItem = base64Image;

    // Chama a função insertImage para inserir no banco de dados
    insertImage(req, res);
    res.render('upload', { base64Image: this.base64Image })

});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
