const express = require('express');
const db = require('./config/db');

const app = express();

app.use(express.json());

const productosRoutes = require('./routes/productos');
app.use('/api', productosRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});