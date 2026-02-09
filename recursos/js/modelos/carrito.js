let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || []

function guardarCarrito() {
    localStorage.setItem("carritoCompras", JSON.stringify(carrito))
}

function agregarAlCarrito(productoNuevo) {
    const productoExistente = carrito.find(item => item.id === productoNuevo.id)

    if (productoExistente) {
        productoExistente.cantidad++
    } else {
        carrito.push({ ...productoNuevo, cantidad: 1 })
    }

    guardarCarrito()
    obtenerCarrito()
}

// --- NUEVA FUNCIÓN INDEPENDIENTE (GLOBAL) ---
// La sacamos afuera para que "actualizarCantidad" la pueda ver
function eliminarDelCarrito(idProducto) {
    const indice = carrito.findIndex(producto => producto.id == idProducto)

    if (indice !== -1) {
        carrito.splice(indice, 1)
        guardarCarrito()
    }

    obtenerCarrito()
}

function actualizarCantidad(idProducto, accion) {
    const producto = carrito.find(item => item.id == idProducto)

    if (producto) {
        if (accion === "sumar") {
            producto.cantidad++
            guardarCarrito()

        } else if (accion === "restar") {
            if (producto.cantidad > 1) {
                producto.cantidad--
                guardarCarrito()
            } else {
                eliminarDelCarrito(idProducto)
            }
        }        
    }
    obtenerCarrito()
}

function obtenerCarrito() {
    return carrito
}

export { agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, obtenerCarrito}