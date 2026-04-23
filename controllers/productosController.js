const connection = require('../config/db');

// CREAR
exports.crearProducto = (req, res) => {
    const producto = req.body;
    connection.query("INSERT INTO productos SET ?", producto, (err) => {
        if (err) throw err;
        res.send('Producto creado');
    });
};

// LISTAR
exports.listarProductos = (req, res) => {
    connection.query("SELECT * FROM productos", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// OBTENER POR ID
exports.obtenerProductoPorId = (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
};

// ACTUALIZAR
exports.actualizarProducto = (req, res) => {
    const id = req.params.id;
    connection.query("UPDATE productos SET ? WHERE id = ?", [req.body, id], (err) => {
        if (err) throw err;
        res.send('Producto actualizado');
    });
};

// ELIMINAR
exports.eliminarProducto = (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send('Producto eliminado');
    });
};