function renderizarCatalogo(arreglo, $contenedor) {
    let HTMLproductos = ""
    arreglo.forEach(element => {

        const HTMLproducto = `

            <article class="tarjeta-producto">
                <img class="tarjeta-producto__imagen" src="${element.imagen.src}" alt="${element.imagen.alt}">

                <div class="tarjeta-producto__informacion">
                    <h2 class="tarjeta-producto__titulo">${element.nombre}</h2>
                    <h2 class="tarjeta-producto__bodega">${element.bodega}</h2>
                    <p class="tarjeta-producto__parrafo">${element.descripcion}</p>

                 <div class="tarjeta-producto__footer">
                    <p class="tarjeta-producto__precio"><strong>$${element.precio}</strong></p>

                    <button class="tarjeta-producto__btn-agregar" aria-label="Agregar al carrito">
                     <img class="tarjeta-producto__icono-carrito" src="./recursos/imagenes/boton-agregar-carrito.svg" alt="" />
                     <p class="tarjeta-producto__parrafo-carrito">Agregar al carrito</p></button>

</div>
                </div>
            </article>
        `
        
        HTMLproductos += HTMLproducto
    });

    $contenedor.innerHTML = HTMLproductos
}

export {renderizarCatalogo}