function crearPlantillaMensajeContacto(datos) {

    const { $nombre, $email, $telefono, $motivoContacto, $comentario } = datos

    const mensajeContacto = `Mensaje proveniente de *CONTACTO* del sitio de Mini Wine:

    *•Motivo de contacto:* ${$motivoContacto}
    *•Nombre*: ${$nombre}
    *•Email*: ${$email}
    *•Teléfono*: ${$telefono}
    *•Comentario*: 
    ${$comentario}`

    return mensajeContacto
}

function crearPlantillaMensajeCarrito(datos) {

    const { 
        productos, 
        entrega, 
        metodoPago, 
        nombreApellido, 
        email, 
        provincia, 
        localidad, 
        direccion, 
        codigoPostal 
    } = datos


    let textoProductos = ""
    let total = 0

    productos.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad
        total += subtotal

    // TERNARIO: Si tiene bodega, la formatea. Si no, string vacío. Ej: pack de 4 vinos elegidos por MiniWine x1
    const infoBodega = prod.bodega ? ` (${prod.bodega})` : ""

        textoProductos += `• ${prod.nombre}${infoBodega} x${prod.cantidad} - $${subtotal}\n`
    })

    let infoUbicacion = ""

    if(entrega.toLowerCase().includes("env")){
        infoUbicacion = `*• Dirección:* ${direccion}, ${localidad}, ${provincia} (CP: ${codigoPostal})`    
    }
    else{
        infoUbicacion = `*• Punto de Retiro:* Calandria 667 (Córdoba)`
    }

    const mensajePedido = `¡Hola! Quiero realizar un pedido desde el *CATÁLOGO WEB*:

*MI CARRITO:*
${textoProductos}
*TOTAL: $${total}*
-------------------------
*DATOS DE ENVÍO:*
*•Nombre:* ${nombreApellido}
*•Entrega:* ${entrega}
*•Pago:* ${metodoPago}
*•Email:* ${email}
${infoUbicacion}`

    return mensajePedido
}

function crearLinkMensajeWhatsapp(mensaje, numeroTelefono) {

    const mensajeCodificado = encodeURIComponent(mensaje)
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`
    return urlWhatsApp
}

export { crearPlantillaMensajeContacto, crearLinkMensajeWhatsapp, crearPlantillaMensajeCarrito }