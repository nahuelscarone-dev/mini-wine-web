// ==================================================================
// 1. ESTADO Y ALMACENAMIENTO
// ==================================================================

let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

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

function agregarAlCarrito(productoNuevo) {
    const productoExistente = carrito.find(item => item.id === productoNuevo.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...productoNuevo, cantidad: 1 });
    }

    renderizarCarrito();
    guardarCarrito();
}

// --- NUEVA FUNCIÓN INDEPENDIENTE (GLOBAL) ---
// La sacamos afuera para que 'actualizarCantidad' la pueda ver
function eliminarDelCarrito(idProducto) {
    const indice = carrito.findIndex(producto => producto.id == idProducto);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        renderizarCarrito();
        guardarCarrito();
    }
}

function actualizarCantidad(idProducto, accion) {
    const producto = carrito.find(item => item.id == idProducto);

    if (producto) {
        if (accion === "sumar") {
            producto.cantidad++;
            renderizarCarrito();
            guardarCarrito();

        } else if (accion === "restar") {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                renderizarCarrito();
                guardarCarrito();
            } else {
                eliminarDelCarrito(idProducto);
            }
        }
    }
}

// Función para dibujar el carrito en el HTML
function renderizarCarrito() {
    contenedorProductos.innerHTML = '';

    let cantidadTotal = 0;
    let precioTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
        precioTotal += producto.precio * producto.cantidad;

        const subtotalProducto = producto.precio * producto.cantidad;

        const article = document.createElement('article');
        article.classList.add('carrito-tarjeta');

        article.innerHTML = `
            <img src="${producto.imagen.src}" alt="${producto.nombre}" class="carrito-tarjeta__imagen">
            <div class="carrito-tarjeta__info">
                <h3 class="carrito-tarjeta__titulo">${producto.nombre}</h3>
                <p class="carrito-tarjeta__precio">$${subtotalProducto}</p>
            </div>
            <div class="carrito-tarjeta__controles">
                <div class="carrito-tarjeta__cantidad">
                    <button class="carrito-tarjeta__boton-cantidad" data-accion="restar" data-id="${producto.id}">-</button>
                    <span class="carrito-tarjeta__cantidad-valor">${producto.cantidad}</span>
                    <button class="carrito-tarjeta__boton-cantidad" data-accion="sumar" data-id="${producto.id}">+</button>
                </div>
                <button class="carrito-tarjeta__boton-eliminar" data-id="${producto.id}">
                    <img src="./recursos/imagenes/icono-borrar.svg" alt="Eliminar">
                </button>
            </div>
        `;

        contenedorProductos.appendChild(article);
    });

    spanCantidadTotal.textContent = cantidadTotal || '0';
    spanPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;

    if (contadorFlotante) {
        contadorFlotante.textContent = cantidadTotal || '0';
    }

    agregarListenersProductos();
}

// Función para escuchar los botones dentro del carrito
function agregarListenersProductos() {
    // 1. Listeners para CANTIDAD (+ y -)
    const botonesCantidad = document.querySelectorAll('.carrito-tarjeta__boton-cantidad');

    botonesCantidad.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const accion = e.target.dataset.accion;
            actualizarCantidad(id, accion);
        });
    });

    // 2. Listeners para ELIMINAR
    const botonesEliminar = document.querySelectorAll('.carrito-tarjeta__boton-eliminar');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Usamos currentTarget por seguridad (igual que en el catálogo)
            const id = e.currentTarget.dataset.id;
            eliminarDelCarrito(id);
        });
    });
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