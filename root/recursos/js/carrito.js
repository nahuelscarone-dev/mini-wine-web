// ==================================================================
// 1. ESTADO Y ALMACENAMIENTO
// ==================================================================

// Intentamos cargar desde localStorage, si no hay nada, iniciamos con un array vacío.
let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

// Función para guardar el estado actual en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
}

// ==================================================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// ==================================================================
const dialogCarrito = document.querySelector('.carrito');
const btnAbrirCarrito = document.querySelector('.btn-flotante-carrito');
const btnCerrarCarrito = document.querySelector('.carrito__boton-cerrar');

const contenedorProductos = document.querySelector('.carrito__productos');
const spanCantidadTotal = document.querySelector('.carrito__titulo span');
const spanPrecioTotal = document.querySelector('.carrito__total span');
const contadorFlotante = document.querySelector('.carrito-contador');

// ==================================================================
// 3. FUNCIONES LÓGICAS DEL CARRITO
// ==================================================================

// Función principal para agregar un producto
function agregarAlCarrito(productoNuevo) {
    // Comprobar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoNuevo.id);

    if (productoExistente) {
        // Si ya existe, aumentamos su cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo añadimos con cantidad 1
        carrito.push({ ...productoNuevo, cantidad: 1 });
    }

    // ¡IMPORTANTE! Actualizar la vista y guardar después de agregar
    renderizarCarrito();
    guardarCarrito();
}

function actualizarCantidad(idProducto, accion) {
    // CORRECCIÓN: Buscamos comparando item.id con el idProducto que recibimos
    const producto = carrito.find(item => item.id == idProducto);

    if (producto) {
        if (accion === "sumar") {
            producto.cantidad++;
        } else if (accion === "restar") {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            }
        }
        renderizarCarrito();
        guardarCarrito();
    }
}

// Función para dibujar el carrito en el HTML
function renderizarCarrito() {
    // 1. Limpiar el contenedor previo
    contenedorProductos.innerHTML = '';

    // 2. Variables para totales
    let cantidadTotal = 0;
    let precioTotal = 0;

    // 3. Recorrer el carrito y crear los elementos HTML
    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
        precioTotal += producto.precio * producto.cantidad;

        const subtotalProducto= producto.precio*producto.cantidad

        // Si la cantidad es 1, creamos un string con la palabra 'disabled', esto al colocarlo en el renderizado nos bloquea el botón -. 
        // Si es mayor a 1, dejamos el string vacío.
        const atributoDisabled = (producto.cantidad === 1) ? 'disabled' : '';

        const article = document.createElement('article');
        article.classList.add('carrito-tarjeta');

        article.innerHTML = `
            <img src="${producto.imagen.src}" alt="${producto.nombre}" class="carrito-tarjeta__imagen">
            <div class="carrito-tarjeta__info">
                <h3 class="carrito-tarjeta__titulo">${producto.nombre}</h3>
                <p class="carrito-tarjeta__precio">$${subtotalProducto}</p>
            </div>
            <div class="carrito-tarjeta__cantidad">
                <button class="carrito-tarjeta__boton-cantidad" data-accion="restar" data-id="${producto.id}"${atributoDisabled}>-</button>
                <span class="carrito-tarjeta__cantidad-valor">${producto.cantidad}</span>
                <button class="carrito-tarjeta__boton-cantidad" data-accion="sumar" data-id="${producto.id}">+</button>
            </div>
            <button class="carrito-tarjeta__boton-eliminar" data-id="${producto.id}">Eliminar</button>
        `;

        contenedorProductos.appendChild(article);
    });

    // 4. Actualizar los totales
    spanCantidadTotal.textContent = cantidadTotal || '0';
    spanPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;

    // 5. Actualizar el contador flotante
    if (contadorFlotante) {
        contadorFlotante.textContent = cantidadTotal || '0';
    }

    // 6. Añadir listeners a los botones recién creados
    agregarListenersProductos();
}

// Función para escuchar los botones dentro del carrito
function agregarListenersProductos() {
    const botonesCantidad = document.querySelectorAll('.carrito-tarjeta__boton-cantidad');

    botonesCantidad.forEach(boton => {

        boton.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const accion = e.target.dataset.accion;

            actualizarCantidad(id, accion);
        });
    });
    
    //Añadir lógica del botón eliminar
    // function eliminarProductoCarrito(){

    // }
}

// ==================================================================
// 4. FUNCIONES DEL POPUP (DIALOG)
// ==================================================================

function abrirCarrito() {
    if (dialogCarrito) {
        dialogCarrito.showModal();
    }
}

function cerrarCarrito() {
    if (dialogCarrito) {
        dialogCarrito.close();
    }
}

// ==================================================================
// 5. EVENT LISTENERS PRINCIPALES
// ==================================================================

if (btnAbrirCarrito) {
    btnAbrirCarrito.addEventListener('click', abrirCarrito);
}

if (btnCerrarCarrito) {
    btnCerrarCarrito.addEventListener('click', cerrarCarrito);
}

if (dialogCarrito) {
    dialogCarrito.addEventListener('click', (event) => {
        if (event.target === dialogCarrito) {
            cerrarCarrito();
        }
    });
}

// ==================================================================
// 6. INICIALIZACIÓN
// ==================================================================
renderizarCarrito();

export { agregarAlCarrito };