function renderizarCatalogo(arreglo, $contenedor) {
    let HTMLproductos = ""
    arreglo.forEach(element => {

        const HTMLproducto = `

            <article class="tarjeta-producto">
                <img class="tarjeta-producto__imagen" width="100" height="100" src="${element.imagen.src}" alt="${element.imagen.alt}">

                <div class="tarjeta-producto__informacion">
                    <h2 class="tarjeta-producto__titulo">${element.nombre}</h2>
                    <h3 class="tarjeta-producto__bodega">${element.bodega}</h3>
                    <h4 class="tarjeta-producto__tipo-vino">${element.tipo}</h4>
                    <p class="tarjeta-producto__parrafo">${element.descripcion}</p>
                    <p class="tarjeta-producto__precio"><strong>$${element.precio}</strong></p>

                    <button data-id="${element.id}" class="boton boton--agregar-al-carrito" aria-label="Agregar al carrito">
                        <img class="tarjeta-producto__icono-carrito" src="./recursos/imagenes/boton-agregar-carrito.svg" alt="" />
                        <p class="tarjeta-producto__parrafo-carrito">Agregar al carrito</p>
                    </button>
                </div>
            </article>
        `

        HTMLproductos += HTMLproducto
    })

    $contenedor.innerHTML = HTMLproductos
}

function renderizarCarrito(carrito, contenedorProductos, spanCantidadTotal, spanPrecioTotal, contadorFlotante) {

    contenedorProductos.innerHTML = ""

    if(carrito.length === 0){
        mostrarMensajeVacio(contenedorProductos, "Tu carrito está vacío", "¡Agrega algún producto para llenarlo!")

        spanCantidadTotal.textContent = "0"
        spanPrecioTotal.textContent = "$0.00"
        if(contadorFlotante) contadorFlotante.textContent = "0"

        return
    }


    let cantidadTotal = 0
    let precioTotal = 0

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad
        precioTotal += producto.precio * producto.cantidad

        const subtotalProducto = producto.precio * producto.cantidad

        const article = document.createElement("article")
        article.classList.add("carrito-tarjeta")

        article.innerHTML = `
            <img src="${producto.imagen.src}" alt="${producto.nombre}" class="carrito-tarjeta__imagen">
            <div class="carrito-tarjeta__info">
                <h3 class="carrito-tarjeta__titulo">${producto.nombre} ${producto.bodega ? `- ${producto.bodega}` : ""}</h3>
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
        `

        contenedorProductos.appendChild(article)
    })

    spanCantidadTotal.textContent = cantidadTotal
    spanPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`
    contadorFlotante.textContent = cantidadTotal
}

function cargarSelectMetodoPago(datos, $selectMetodoPago) {

    const defaultOption = document.createElement("option")
    defaultOption.textContent = "Seleccione una opción"
    defaultOption.value = ""
    defaultOption.selected = true
    defaultOption.disabled = true

    $selectMetodoPago.appendChild(defaultOption)

    datos.forEach(metodo => {
        if(metodo.activo) {
            const option = document.createElement("option")
            option.value = metodo.nombre
            option.textContent = metodo.nombre

            $selectMetodoPago.appendChild(option)
        }
    })
}

function cargarFiltroCatalogo(productos, $filtro, textoOpcionDefault, propiedad)
{
    //Limpiamos opciones viejas dejando la que se encuentre por defecto
    $filtro.innerHTML = `<option value="todos">${textoOpcionDefault}</option>`

    const valores = productos.map(producto => producto[propiedad])

    //Set sirve para eliminar duplicados automáticamente
    const valoresSinRepetir = [...new Set(valores)].sort()

    valoresSinRepetir.forEach(valor => {

        if(valor){
            const option = document.createElement("option") 
            option.value = valor
            option.textContent = valor
            $filtro.appendChild(option)
        }
    })
}

function mostrarCarrito(dialogCarrito) {
    dialogCarrito.showModal()
}

function ocultarCarrito(dialogCarrito) {
    dialogCarrito.close()
}

function mostrarMensajeError(contenedorErrores, errores) {

    if(errores.length === 0) {
        contenedorErrores.style.display = "none"
        contenedorErrores.innerHTML = ""
    } else {
        contenedorErrores.style.display = "block"
        contenedorErrores.innerHTML = errores[0]
        contenedorErrores.style.color = "#ff4545"
        contenedorErrores.style.fontWeight = "bold"
    }
}

function mostrarMensajeVacio(contenedor, titulo, texto) {

    contenedor.innerHTML = `
        <div class="mensaje-sin-resultados">
            <p class="mensaje-sin-resultados__titulo">
                ${titulo}
            </p>
            <p class="mensaje-sin-resultados__texto">
                ${texto}
            </p>
        </div>
    `
}

function cambiarVisibilidadElementosCarrito(productosCarrito, $formulario, $footer, $botonWspp,$fieldsetEntrega, $camposEnvio, $contenedorDatosPedido) {

    let esEnvio = false

    if(productosCarrito.length !== 0) {
        $footer.classList.remove("ocultar-elemento-carrito")
        $formulario.classList.remove("ocultar-elemento-carrito")

        const $botonEntregaSeleccionado = $fieldsetEntrega.querySelector(".carrito__boton-entrega:checked")
        
        if($botonEntregaSeleccionado) {
            
            $contenedorDatosPedido.classList.remove("ocultar-elemento-carrito")
            $botonWspp.classList.remove("ocultar-elemento-carrito")
            
            esEnvio = $botonEntregaSeleccionado.value === 'envio'

            if(esEnvio) {
                $camposEnvio.classList.remove("ocultar-elemento-carrito")

            } else {
                $camposEnvio.classList.add("ocultar-elemento-carrito")
            }

        } else {
            $contenedorDatosPedido.classList.add("ocultar-elemento-carrito")
            $botonWspp.classList.add("ocultar-elemento-carrito")            
        }

    } else {
        $formulario.classList.add("ocultar-elemento-carrito")
        $footer.classList.add("ocultar-elemento-carrito")

        const $botonesEntrega = $fieldsetEntrega.querySelectorAll(".carrito__boton-entrega")
        $botonesEntrega.forEach(boton => boton.checked = false)
    }

    const $inputsEnvio = $camposEnvio.querySelectorAll('input, select');

    $inputsEnvio.forEach(elemento => {
        elemento.required = esEnvio
    })
}


export { renderizarCatalogo, renderizarCarrito, cargarSelectMetodoPago, cargarFiltroCatalogo, mostrarCarrito, ocultarCarrito, mostrarMensajeError, mostrarMensajeVacio, cambiarVisibilidadElementosCarrito}