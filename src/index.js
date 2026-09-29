import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import usuarioRoutes from '../src/routes/usuarioRoutes.js';
import authRoutes from '../src/routes/authRoutes.js';
import produtoRoutes from '../src/routes/produtoRoutes.js';
import itemPedidoRoutes from '../src/routes/itemPedidoRoutes.js';
import pedidoRoutes from '../src/routes/pedidoRouters.js';
import categoriaRoutes from '../src/routes/categoriaRouters.js';

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

app.use(`${apiPrefix}/usuarios`, usuarioRoutes);
app.use(`${apiPrefix}/login`, authRoutes);
app.use(`${apiPrefix}/produtos`, produtoRoutes);
app.use(`${apiPrefix}/pedidoItem`, itemPedidoRoutes);
app.use(`${apiPrefix}/categorias`, categoriaRoutes);
app.use(`${apiPrefix}/pedidos`, pedidoRoutes);


app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).send('Algo de errado no servidor.')
})
