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
                        <p class="tarjeta-producto__precio">$${element.precio}</p>
                        <img class="tarjeta-producto__boton-carrito" src="${element.imagen['boton-carrito']}"</>
                    </div>
                </div>
            </article>
        `
        
        HTMLproductos += HTMLproducto
    });

    $contenedor.innerHTML = HTMLproductos
}

export {renderizarCatalogo}