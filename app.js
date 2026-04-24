const express = require('express');
const db = require('./config/db'); // Conexión a inventario_tienda [cite: 13, 98]

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios [cite: 60]

// CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS
// Esto permite que el navegador acceda a tu index.html y a las imágenes subidas
app.use(express.static('public'));

// 🔥 CORRECCIÓN CRÍTICA:
// Como Multer guarda en 'public/uploads', el navegador debe buscar dentro de 'public'
app.use('/uploads', express.static('public/uploads'));

// RUTAS
const productosRoutes = require('./routes/productos');
app.use('/api', productosRoutes); // Prefijo para cumplir con el estándar [cite: 235]

// RUTAS DE PRUEBA
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.get('/status', (req, res) => {
    res.send('API funcionando correctamente');
});

// INICIO DEL SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});