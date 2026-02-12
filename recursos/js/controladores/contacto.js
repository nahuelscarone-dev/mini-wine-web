import { mostrarMensajeError } from "../vistas/renderizado.js"
import { validarCamposFormularioContacto } from "../modelos/validacion.js"
import { crearPlantillaMensajeContacto, crearLinkMensajeWhatsapp } from "../modelos/mensaje.js"

const $contenedorErrores = document.getElementById("errores")
const $formularioContacto = document.getElementById("formulario-contacto")
const numeroWhatsApp = "5493518519953" 

//Agregamos el escuchador
document.addEventListener("DOMContentLoaded", ()=>{
    //Buscamos si hay parámetros en la URL
    const parametrosURL= new URLSearchParams(window.location.search)
    const motivo= parametrosURL.get("motivo")
    
    //Si el motivo es bodega, se selecciona la opción en el select que deseemos
    if(motivo==="bodega"){
        const $selectMotivo= document.getElementById("id-motivo")
        if ($selectMotivo){
            
            //Como en el html los <option> no tienen el atributo value, se escribe la opción directamente del select que se desee seleccionar
            $selectMotivo.value = "Quiero trabajar con Mini Wine"
        }
    }
})

$formularioContacto.addEventListener("submit", (evento) => {

    evento.preventDefault()

    const nombre = document.getElementById("id-nombre").value.trim()
    const email = document.getElementById("id-email").value.trim()
    const telefono = document.getElementById("id-telefono").value.trim()
    const motivoContacto = document.getElementById("id-motivo").value.trim()
    const comentario = document.getElementById("id-comentario").value.trim()

    const datos = {nombre, email, telefono, motivoContacto, comentario}

    const errores = validarCamposFormularioContacto(datos)

    mostrarMensajeError($contenedorErrores, errores)

    if(errores.length === 0) {

        const textoMensaje = crearPlantillaMensajeContacto(datosFormulario)

        const urlWhatsApp = crearLinkMensajeWhatsapp(textoMensaje, numeroWhatsApp)

        window.open(urlWhatsApp, "_blank")
    }
})

