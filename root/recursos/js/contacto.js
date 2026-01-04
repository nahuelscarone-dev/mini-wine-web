import {mostrarMensajeError, crearMensajeWhatsapp} from "./validacion.js";

const $contenedorErrores = document.getElementById("formulario__errores")
const $formularioContacto = document.getElementById("formulario-contacto")
const numeroWhatsApp = '5493518519953'; 

$formularioContacto.addEventListener("submit", (evento) => {
    const $nombre = document.getElementById('id-nombre').value.trim();
    const $email = document.getElementById('id-email').value.trim();
    const $telefono = document.getElementById('id-telefono').value.trim();
    const $motivoContacto = document.getElementById('id-motivo').value.trim();
    const $comentario = document.getElementById('id-comentario').value.trim();

    const mensajeSumaTuViñedo = `Mensaje proveniente de *Contacto*:

    *•Nombre*: ${$nombre}

    *•Email*: ${$email}

    *•Teléfono*: ${$telefono}

    *•Motivo de contacto: ${$motivoContacto}

    *•Comentario*: 
    ${$comentario}
`
    evento.preventDefault()

    const errores = mostrarMensajeError($contenedorErrores, $nombre, $email, $telefono, $comentario)

    if(errores === 0) {
        crearMensajeWhatsapp(mensajeSumaTuViñedo, numeroWhatsApp)
    }
})

