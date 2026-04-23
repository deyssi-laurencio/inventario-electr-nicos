const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');

router.get('/productos', controller.listarProductos);
router.post('/productos', controller.crearProducto);
router.get('/productos/:id', controller.obtenerProductoPorId);
router.put('/productos/:id', controller.actualizarProducto);
router.delete('/productos/:id', controller.eliminarProducto);

module.exports = router;