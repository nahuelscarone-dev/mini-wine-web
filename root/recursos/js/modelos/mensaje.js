function crearPlantillaMensajeContacto(datos) {

    const { $nombre, $email, $telefono, $motivoContacto, $comentario } = datos;

    const mensajeContacto = `Mensaje proveniente de *CONTACTO* del sitio de Mini Wine:

    *•Motivo de contacto:* ${$motivoContacto}
    *•Nombre*: ${$nombre}
    *•Email*: ${$email}
    *•Teléfono*: ${$telefono}
    *•Comentario*: 
    ${$comentario}`;

    return mensajeContacto
}

function crearLinkMensajeWhatsapp(mensaje, numeroTelefono) {

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    return urlWhatsApp
}

export { crearPlantillaMensajeContacto, crearLinkMensajeWhatsapp }