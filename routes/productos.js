const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');
const multer = require('multer');

// CONFIGURACIÓN DE MULTER
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// RUTAS CRUD
router.get('/productos', controller.listarProductos);

// Crear producto (con imagen)
router.post('/productos', upload.single('imagen'), controller.crearProducto);

router.get('/productos/:id', controller.obtenerProductoPorId);

// ACTUALIZAR (Corregido: Ahora permite recibir archivos con upload.single)
router.put('/productos/:id', upload.single('imagen'), controller.actualizarProducto);

router.delete('/productos/:id', controller.eliminarProducto);

module.exports = router;