// 1. Estado del Carrito
// Intentamos cargar desde localStorage, si no hay nada, iniciamos con un array vacío.
let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

//-Función para guardar el estado actual en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
}

//-Selección de elementos del DOM
const dialogCarrito= document.querySelector('.carrito')
const btnAbrirCarrito= document.querySelector('.btn-flotante-carrito')
const btnCerrarCarrito= document.querySelector('.carrito__boton-cerrar')

// //-Funciones del Carrito

// function agregarAlCarrito(productoNuevo) {
//     // Comprobar si el producto ya está en el carrito
//     const productoExistente = carrito.find(item => item.id === productoNuevo.id);

//     if (productoExistente) {
//         // Si ya existe, aumentamos su cantidad
//         productoExistente.cantidad++;
//     } else {
//         // Si no existe, lo añadimos con cantidad 1
//         // Asegúrate de que productoNuevo tenga propiedades como id, nombre, precio, imagen.
//         carrito.push({ ...productoNuevo, cantidad: 1 });
//     }

//     // Después de modificar el carrito, actualizamos la vista y guardamos
//     renderizarCarrito();
//     guardarCarrito();

//-Funciones
function abrirCarrito(){
    dialogCarrito.showModal();
} 

function cerrarCarrito(){
    dialogCarrito.close();
}

//-Event listeners 
if(btnAbrirCarrito){
    btnAbrirCarrito.addEventListener('click',abrirCarrito)
}

if(btnCerrarCarrito){
    btnCerrarCarrito.addEventListener('click', cerrarCarrito)
}

// Opcional: Cerrar al hacer clic fuera del contenido del diálogo
dialogCarrito.addEventListener('click', (event) => {
    // Comprueba si el clic fue en el elemento <dialog> directamente (el fondo)
    // y no en uno de sus elementos hijos (el contenido del carrito).
    if (event.target === dialogCarrito) {
        cerrarCarrito();
    }
})