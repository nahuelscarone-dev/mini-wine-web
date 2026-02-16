function filtrarProductos(productos, presentacionElegida, tipoVinoElegido, bodegaElegida) {

    let datosFiltrados = [...productos]

    if(presentacionElegida !== "todos") {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.presentacion === presentacionElegida
        )
    }

    if(tipoVinoElegido !== "todos") {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.tipo === tipoVinoElegido
        )
    }

    if(bodegaElegida !== "todos"){
        datosFiltrados = datosFiltrados.filter(producto => producto.bodega == bodegaElegida)
    } 

    return datosFiltrados
}

export {filtrarProductos}