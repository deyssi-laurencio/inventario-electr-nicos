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

// RUTAS
router.get('/productos', controller.listarProductos);

// 🔥 ESTA LÍNEA ES LA IMPORTANTE
router.post('/productos', upload.single('imagen'), controller.crearProducto);

router.get('/productos/:id', controller.obtenerProductoPorId);
router.put('/productos/:id', controller.actualizarProducto);
router.delete('/productos/:id', controller.eliminarProducto);

module.exports = router;