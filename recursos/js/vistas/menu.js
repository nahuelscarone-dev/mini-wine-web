const $menu = document.getElementById("navegacion")
const $boton = document.getElementById("navegacion__boton")
const $navegacion = document.getElementById("navegacion")
const $overlay = document.getElementById("overlay-menu")
const $imagenBoton = document.getElementById("navegacion__icono")

const mediaQuery = window.matchMedia("(min-width: 1024px)")

$boton.addEventListener("click", () => {
    $navegacion.classList.toggle("navegacion--abierta")
    $overlay.classList.toggle("overlay-menu--abierto")
    document.body.classList.toggle("no-scroll")

    if($navegacion.classList.contains("navegacion--abierta")) {
        $imagenBoton.src = "./recursos/imagenes/icono-cerrar-menu.svg"
    } else {
        $imagenBoton.src = "./recursos/imagenes/icono menú.svg"
    }
})

function chequearAncho(e) {
    if (e.matches) {  
        // Pantalla >= 768px
        $menu.classList.remove("navegacion--abierta")
        $overlay.classList.remove("overlay-menu--abierto")
        document.body.classList.remove("no-scroll") // si bloqueás scroll
        $imagenBoton.src = "./recursos/imagenes/icono menú.svg"
    }
}

mediaQuery.addEventListener("change", chequearAncho)