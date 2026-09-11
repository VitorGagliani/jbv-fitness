import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

const corsOptions = {
  origin: ['http://localhost:3333', 'https://meudominio.com'],
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true
};



app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});


const apiPrefix = '/api';

app.use(`${apiPrefix}/usuarios`, require('./routes/usuarioRoutes'));

app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).send('Algo de errado no servidor.')
})
