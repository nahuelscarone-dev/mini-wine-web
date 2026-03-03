function renderizarCatalogo(arreglo, $contenedor) {
    let HTMLproductos = ""
    arreglo.forEach(element => {

        const HTMLproducto = `

            <article class="tarjeta-producto">
                <img class="tarjeta-producto__imagen" width="100" height="100" src="${element.imagen.src}" alt="${element.imagen.alt}">

                <div class="tarjeta-producto__informacion">
                    <h2 class="tarjeta-producto__titulo">${element.nombre}</h2>
                    ${element.bodega ? `<h3 class="tarjeta-producto__bodega">${element.bodega}</h3>` : ""}
                    ${element.tipo ? `<h4 class="tarjeta-producto__tipo-vino">${element.tipo}</h4>` : ""}
                    <p class="tarjeta-producto__precio"><strong>$${element.precio}</strong></p>

                    <button data-id="${element.id}" class="boton boton--agregar-al-carrito" aria-label="Agregar al carrito">
                        <div class="tarjeta-producto__elementos-boton">
                            <img class="tarjeta-producto__icono-carrito" src="./recursos/imagenes/boton-agregar-carrito.svg" alt="" />
                            <p class="tarjeta-producto__parrafo-carrito">Agregar al carrito</p>
                        </div>

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
                    <button class="carrito-tarjeta__boton-cantidad" aria-label="Disminuir cantidad de ${producto.nombre}" data-accion="restar" data-id="${producto.id}">-</button>
                    <span class="carrito-tarjeta__cantidad-valor" aria-live="polite">${producto.cantidad}</span>
                    <button class="carrito-tarjeta__boton-cantidad" aria-label="Aumentar cantidad de ${producto.nombre}" data-accion="sumar" data-id="${producto.id}">+</button>
                </div>
                <button class="carrito-tarjeta__boton-eliminar" aria-label="Eliminar ${producto.nombre} del carrito" data-id="${producto.id}">
                    <img src="./recursos/imagenes/icono-borrar.svg" alt="" alt="" aria-hidden="true">
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

function ocultarMensajeError(contenedorErrores) {
    contenedorErrores.style.display = "none"
    contenedorErrores.innerHTML = ""
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

function renderizarFooter(datosGlobales, $imgLogo, $contenedorRedes) {
    // 1. Dibuja el logo
    if ($imgLogo) {
        $imgLogo.src = datosGlobales.logo_footer;
    }

    // 2. Dibuja las redes
    if ($contenedorRedes) {
        $contenedorRedes.innerHTML = ""; 
        datosGlobales.enlaces_contacto.forEach(enlace => {
            const htmlEnlace = `
                <a class="pie__link" href="${enlace.url}" target="_blank" rel="noopener noreferrer">
                    <img class="pie__icono" src="${enlace.icono}" alt="Ícono de ${enlace.plataforma}" aria-hidden="true">
                    <span class="pie__texto">${enlace.texto}</span>
                </a>
            `;
            $contenedorRedes.insertAdjacentHTML('beforeend', htmlEnlace);
        });
    }
}
function renderizarTextosCatalogo(textos) {
    const $titulo = document.getElementById("titulo-pagina");
    const $textoMinorista = document.getElementById("texto-minorista");
    const $enlaceMayorista = document.getElementById("enlace-mayorista");

    if ($titulo) $titulo.textContent = textos.titulo_pagina;
    if ($textoMinorista) $textoMinorista.textContent = textos.texto_minorista;
    if ($enlaceMayorista) {
        $enlaceMayorista.textContent = textos.texto_enlace_mayorista;
        $enlaceMayorista.href = textos.enlace_mayorista;
    }
}
function renderizarTextosInicio(textos) {
    // Hero
    const $heroImg = document.getElementById("hero-img");
    const $heroTexto = document.getElementById("hero-texto");
    if ($heroImg) $heroImg.src = textos.hero.imagen;
    if ($heroTexto) $heroTexto.textContent = textos.hero.texto;

    // Nosotros
    const $nosotrosTitulo = document.getElementById("nosotros-titulo");
    const $nosotrosParrafo = document.getElementById("nosotros-parrafo");
    if ($nosotrosTitulo) $nosotrosTitulo.textContent = textos.seccion_nosotros.titulo;
    if ($nosotrosParrafo) $nosotrosParrafo.textContent = textos.seccion_nosotros.parrafo;

    // Productos
    const $prodTitulo = document.getElementById("productos-titulo");
    if ($prodTitulo) $prodTitulo.textContent = textos.seccion_productos.titulo;
    
    document.getElementById("prod1-img").src = textos.seccion_productos.producto_1.imagen;
    document.getElementById("prod1-titulo").textContent = textos.seccion_productos.producto_1.titulo;
    document.getElementById("prod1-parrafo").textContent = textos.seccion_productos.producto_1.parrafo;

    document.getElementById("prod2-img").src = textos.seccion_productos.producto_2.imagen;
    document.getElementById("prod2-titulo").textContent = textos.seccion_productos.producto_2.titulo;
    document.getElementById("prod2-parrafo").textContent = textos.seccion_productos.producto_2.parrafo;

    // Delivery
    document.getElementById("delivery-titulo").textContent = textos.seccion_delivery.titulo;
    document.getElementById("delivery-texto-barrios").textContent = textos.seccion_delivery.texto_barrios;
    document.getElementById("delivery-texto-otras").textContent = textos.seccion_delivery.texto_otras_zonas;
    document.getElementById("delivery-texto-mapa").textContent = textos.seccion_delivery.texto_mapa;
    document.getElementById("delivery-mapa").src = textos.seccion_delivery.url_mapa;

    // Barrios (Lista dinámica)
    const $listaBarrios = document.getElementById("delivery-lista-barrios");
    if ($listaBarrios) {
        $listaBarrios.innerHTML = "";
        textos.seccion_delivery.barrios.forEach(barrio => {
            $listaBarrios.insertAdjacentHTML("beforeend", `<li>${barrio}</li>`);
        });
    }

    // Bodega
    document.getElementById("bodega-titulo").textContent = textos.seccion_bodega.titulo;
    document.getElementById("bodega-parrafo").textContent = textos.seccion_bodega.parrafo;
    const $bodegaBoton = document.getElementById("bodega-boton");
    if ($bodegaBoton) {
        $bodegaBoton.textContent = textos.seccion_bodega.texto_boton;
        $bodegaBoton.href = textos.seccion_bodega.url_boton;
    }
}

export { renderizarCatalogo, renderizarCarrito, cargarSelectMetodoPago, cargarFiltroCatalogo, mostrarCarrito, ocultarCarrito, mostrarMensajeError, mostrarMensajeVacio, cambiarVisibilidadElementosCarrito, ocultarMensajeError, renderizarFooter,renderizarTextosCatalogo, renderizarTextosInicio }