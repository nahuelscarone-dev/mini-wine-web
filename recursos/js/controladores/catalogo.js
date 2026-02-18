import { obtenerDatos } from "../modelos/datos.js"
import { agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, obtenerCarrito } from "../modelos/carrito.js"
import {validarCamposFormularioCarrito } from "../modelos/validacion.js"
import { crearLinkMensajeWhatsapp, crearPlantillaMensajeCarrito } from "../modelos/mensaje.js"
import { filtrarProductos } from "../modelos/filtros.js"

import { renderizarCatalogo, renderizarCarrito, cargarSelectMetodoPago, cargarFiltroCatalogo, mostrarCarrito, ocultarCarrito, mostrarMensajeVacio, mostrarMensajeError, cambiarVisibilidadElementosCarrito, ocultarMensajeError } from "../vistas/renderizado.js"

const datosCatalogo = await obtenerDatos("./datos/catalogo.json")
const datosMetodosPago = await obtenerDatos("./datos/metodos-pago.json")

const $contenedor = document.getElementById("seccion-productos")
const $filtroPresentacion = document.getElementById("id-presentacion")
const $filtroTipoVino = document.getElementById("id-tipo-vino") 
const $filtroBodega = document.getElementById("id-bodega")

const numeroWhatsApp = "5493518519953" 

//Carrito
const $dialogCarrito = document.getElementById("carrito")
const $btnAbrirCarrito = document.getElementById("carrito-flotante")
const $btnCerrarCarrito = document.getElementById("boton-cerrar-carrito")
const $contenedorProductos = document.getElementById("carrito-productos")
const $spanCantidadTotal = document.getElementById("carrito-titulo-cantidad")
const $spanPrecioTotal = document.getElementById("carrito-precio-total")
const $contadorFlotante = document.getElementById("carrito-contador")
const $selectMetodoPago = document.getElementById("metodo-pago")
const $inputsEntrega = document.querySelectorAll(".carrito__boton-entrega")
const $fieldsetEntrega = document.getElementById("fieldset-entrega")
const $camposEnvio = document.getElementById("campos-envio")
const $contenedorDatosPedido = document.getElementById("contenedor-datos-pedido")
const $formularioCarrito = document.getElementById("carrito-formulario")
const $contenedorErrores = document.getElementById("errores")
const $footerCarrito = document.getElementById("carrito-footer")
const $botonWspp = document.getElementById("boton-whatsapp")

$filtroPresentacion.addEventListener("change", () => {
    controlSelect()
    aplicarFiltrado()
})

$filtroTipoVino.addEventListener("change", aplicarFiltrado)
$filtroBodega.addEventListener("change", aplicarFiltrado)

$btnAbrirCarrito.addEventListener("click", () => mostrarCarrito($dialogCarrito))

$btnCerrarCarrito.addEventListener("click", () => ocultarCarrito($dialogCarrito))

$dialogCarrito.addEventListener("click", (event) => {
    if (event.target === $dialogCarrito) {
        ocultarCarrito($dialogCarrito)
    }
})

$inputsEntrega.forEach(elemento => {
    elemento.addEventListener("change", (evento) => {
        const carrito = obtenerCarrito()
        cambiarVisibilidadElementosCarrito(carrito, $formularioCarrito, $footerCarrito, $botonWspp, $fieldsetEntrega, $camposEnvio, $contenedorDatosPedido)
        ocultarMensajeError($contenedorErrores)
    })
})

$formularioCarrito.addEventListener("submit", (event) => {
    
    event.preventDefault()

    const productos = obtenerCarrito()
    if(productos.length === 0) return

    const entrega = document.querySelector(".carrito__boton-entrega:checked").value
    const metodoPago = document.getElementById("metodo-pago").value
    const nombreApellido = document.getElementById("nombre-apellido").value.trim()
    const email = document.getElementById("email").value.trim()
    const provincia = document.getElementById("provincia").value
    const localidad = document.getElementById("localidad").value.trim()
    const direccion = document.getElementById("direccion").value.trim()
    const codigoPostal = document.getElementById("cp").value.trim()

    const datos = { productos, entrega, metodoPago, nombreApellido, email, provincia, localidad, direccion, codigoPostal}

    const esEnvio = entrega === 'envio'
    const errores = validarCamposFormularioCarrito(datos, esEnvio)

    console.log(errores)

    mostrarMensajeError($contenedorErrores, errores)

    if(errores.length === 0) {
        
        const textoMensaje = crearPlantillaMensajeCarrito(datos)

        const urlWhatsApp = crearLinkMensajeWhatsapp(textoMensaje, numeroWhatsApp)

        window.open(urlWhatsApp, "_blank")
    }
}) 


function actualizarVistaCarrito() {
    const carrito = obtenerCarrito()

    renderizarCarrito(carrito, $contenedorProductos, $spanCantidadTotal, $spanPrecioTotal, $contadorFlotante)

    cambiarVisibilidadElementosCarrito(carrito, $formularioCarrito, $footerCarrito, $botonWspp,   $fieldsetEntrega, $camposEnvio, $contenedorDatosPedido)

    agregarListenersBotonesCarrito()
}


function agregarListenersBotonesCatalogo() {
    // 1. Seleccionar todos los botones con la clase específica que pusimos en renderizado.js
    const botonesAgregar = document.querySelectorAll(".boton--agregar-al-carrito")

    botonesAgregar.forEach(boton => {

        // 2. Añadir un listener para el evento "click" a cada botón
        boton.addEventListener("click", (e) => {
            // 3. Obtener el ID del producto desde el atributo data-id del botón
            const idProducto = e.currentTarget.dataset.id
            // 4. Buscar el objeto producto completo en nuestro array "datos"
            // Usamos "==" para comparar por si el ID es número y el dataset es string
            const productoSeleccionado = datosCatalogo.find(producto => producto.id == idProducto)

            // 5. Si encontramos el producto, llamamos a la función del carrito
            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado)
                // Opcional: Podrías abrir el carrito aquí si lo deseas
                // import { abrirCarrito } from "./carrito.js"
                // abrirCarrito()
                actualizarVistaCarrito()
                ocultarMensajeError($contenedorErrores)
            }
        })
    })
}

// Función para escuchar los botones dentro del carrito
function agregarListenersBotonesCarrito() {
    // 1. Listeners para CANTIDAD (+ y -)
    const botonesCantidad = document.querySelectorAll(".carrito-tarjeta__boton-cantidad")

    botonesCantidad.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.dataset.id
            const accion = e.target.dataset.accion
            actualizarCantidad(id, accion)
            actualizarVistaCarrito()
        })
    })

    // 2. Listeners para ELIMINAR
    const botonesEliminar = document.querySelectorAll(".carrito-tarjeta__boton-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Usamos currentTarget por seguridad (igual que en el catálogo)
            const id = e.currentTarget.dataset.id
            eliminarDelCarrito(id)
            actualizarVistaCarrito()
        })
    })
}

function aplicarFiltrado() {
    const presentacionElegida = $filtroPresentacion.value
    const tipoVinoElegido = $filtroTipoVino.value
    const bodegaElegida = $filtroBodega.value

    const datosFiltrados = filtrarProductos(datosCatalogo, presentacionElegida, tipoVinoElegido, bodegaElegida)

    if (datosFiltrados.length === 0) {
        mostrarMensajeVacio($contenedor, "No se encontraron productos", "Prueba seleccionando otra bodega o tipo de vino.")
    } else {
        renderizarCatalogo(datosFiltrados, $contenedor)
        agregarListenersBotonesCatalogo()
    }
}

function controlSelect() {
    if($filtroPresentacion.value === "Pack"){
        $filtroTipoVino.value = "todos"
        $filtroTipoVino.disabled = true

        $filtroBodega.value = "todos"
        $filtroBodega.disabled = true
    } else {
        $filtroTipoVino.disabled = false
        $filtroBodega.disabled = false
    }
}

cargarFiltroCatalogo(datosCatalogo, $filtroPresentacion, "Todos los productos", "presentacion")
cargarFiltroCatalogo(datosCatalogo, $filtroTipoVino, "Todos los tipos", "tipo")
cargarFiltroCatalogo(datosCatalogo, $filtroBodega, "Todas las bodegas", "bodega")
cargarSelectMetodoPago(datosMetodosPago, $selectMetodoPago)
aplicarFiltrado()
actualizarVistaCarrito()
