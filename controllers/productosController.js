const connection = require('../config/db');

// 1. LISTAR PRODUCTOS
exports.listarProductos = (req, res) => {
    connection.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).send('Error al listar');
        res.json(results);
    });
};

// 2. CREAR PRODUCTO
exports.crearProducto = (req, res) => {
    const { nombre, precio, stock } = req.body;
    const imagen = req.file ? req.file.filename : null;

    connection.query(
        "INSERT INTO productos (nombre, precio, stock, imagen) VALUES (?, ?, ?, ?)", [nombre, precio, stock, imagen],
        (err) => {
            if (err) return res.status(500).send('Error al crear');
            res.send('Creado');
        }
    );
};

// 3. OBTENER POR ID
exports.obtenerProductoPorId = (req, res) => {
    connection.query("SELECT * FROM productos WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).send('Error');
        res.json(result[0]);
    });
};

// 4. ACTUALIZAR PRODUCTO (LA PARTE QUE FALLABA)
exports.actualizarProducto = (req, res) => {
    const id = req.params.id;
    const { nombre, precio, stock } = req.body;

    let query;
    let valores;

    if (req.file) {
        // Si hay imagen nueva
        query = "UPDATE productos SET nombre = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?";
        valores = [nombre, precio, stock, req.file.filename, id];
    } else {
        // Si NO hay imagen nueva, mantenemos la anterior
        query = "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
        valores = [nombre, precio, stock, id];
    }

    connection.query(query, valores, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar');
        }
        res.send('Actualizado');
    });
};

// 5. ELIMINAR PRODUCTO
exports.eliminarProducto = (req, res) => {
    connection.query("DELETE FROM productos WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).send('Error');
        res.send('Eliminado');
    });
};