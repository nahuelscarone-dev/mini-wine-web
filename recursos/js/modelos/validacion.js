function validarNombre(nombre, errores) {

    if (nombre.length < 2) {
        errores.push("El nombre es demasiado corto.")
    }
    if (nombre.length > 50) {
        errores.push("El nombre es demasiado largo.")
    }

    const nombreRegex = /^(?=.*[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ])[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ0-9\s'-]+$/

    if(nombreRegex.test(nombre) === false) {
        errores.push("El nombre no es válido.")
    }
}

function validarEmail(email, errores) {
 
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    
    if(emailRegex.test(email) === false) {
        errores.push("El email no es válido.")
    }
}

function validarTelefono(telefono, errores) {
    const telefonoRegex = /^\+?\d[\d\s\-()]{8,14}\d$/

    if(telefonoRegex.test(telefono) === false) {
        errores.push("El teléfono no es válido.")
    }
}

function validarComentario(comentario, errores) {

    if (comentario.length < 10) {
        errores.push("El comentario es demasiado corto.")
    }

    const comentarioRegex = /^(?=.*[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ]).+$/

    if(comentarioRegex.test(comentario) === false) {
        errores.push("El comentario no es válido.")
    }
}

function validarLocalidad(localidad, errores) {
    const localidadRegex = /^[a-zA-ZÀ-ÿ0-9.\s'-]{3,50}$/

    if(localidadRegex.test(localidad) === false) {
        errores.push("La localidad no es válida.")
    }
}

function validarDireccion(direccion, errores) {
    const direccionRegex = /^[a-zA-ZÀ-ÿ0-9.\s',#-]{5,100}$/

    if(direccionRegex.test(direccion) === false) {
        errores.push("La dirección no es válida.")
    }
}

function validarCodigoPostal(codigoPostal, errores) {
    const codigoPostalRegex = /^([0-9]{4}|[A-Z][0-9]{4}[A-Z]{3})$/i
    if(codigoPostalRegex.test(codigoPostal) === false) {
        errores.push("El código postal no es válido")
    }
 }

function validarCamposFormularioContacto(nombre, email, telefono, comentario) {
    const errores = []
    validarNombre(nombre, errores)
    validarEmail(email, errores)
    validarTelefono(telefono, errores)
    validarComentario(comentario, errores)

    return errores
}

function validarCamposFormularioCarrito(datos, esEnvio) {
    const errores = []
    validarNombre(datos.nombreApellido, errores)
    validarEmail(datos.email, errores)

    if(esEnvio) {
        validarLocalidad(datos.localidad, errores)
        validarDireccion(datos.direccion, errores)
        validarCodigoPostal(datos.codigoPostal, errores)
    }

    return errores
}

export {validarCamposFormularioContacto, validarCamposFormularioCarrito}