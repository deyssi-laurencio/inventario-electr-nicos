const connection = require('../config/db');

// CREAR
exports.crearProducto = (req, res) => {

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.file ? req.file.filename : null
    };

    console.log("FILE RECIBIDO:", req.file); // 🔥 para verificar

    connection.query("INSERT INTO productos SET ?", producto, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al crear producto');
        }
        res.send('Producto creado');
    });
};

// LISTAR
exports.listarProductos = (req, res) => {
    connection.query("SELECT * FROM productos", (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al listar');
        }
        res.json(results);
    });
};

// OBTENER POR ID
exports.obtenerProductoPorId = (req, res) => {
    connection.query(
        "SELECT * FROM productos WHERE id = ?", [req.params.id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error');
            }
            res.json(result[0]);
        }
    );
};

// ACTUALIZAR
exports.actualizarProducto = (req, res) => {

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    };

    connection.query(
        "UPDATE productos SET ? WHERE id = ?", [producto, req.params.id],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al actualizar');
            }
            res.send('Producto actualizado');
        }
    );
};

// ELIMINAR
exports.eliminarProducto = (req, res) => {
    connection.query(
        "DELETE FROM productos WHERE id = ?", [req.params.id],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error');
            }
            res.send('Producto eliminado');
        }
    );
};