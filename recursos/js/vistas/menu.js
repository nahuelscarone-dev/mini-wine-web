const $menu = document.getElementById("navegacion")
const $boton = document.getElementById("navegacion__boton")
const $navegacion = document.getElementById("navegacion")
const $overlay = document.getElementById("overlay-menu")
const $imagenBoton = document.getElementById("navegacion__icono")

const mediaQuery = window.matchMedia("(min-width: 1024px)")

$boton.addEventListener("click", () => {
    // 1. Toggles visuales
    $menu.classList.toggle("navegacion--abierta")
    $overlay.classList.toggle("overlay-menu--abierto")
    document.body.classList.toggle("no-scroll")

    // 2. Verificamos si el menú quedó abierto después del click
    const estaAbierto = $menu.classList.contains("navegacion--abierta")

    // 3. NUEVO (A11y): Actualizamos el atributo para lectores de pantalla
    $boton.setAttribute("aria-expanded", estaAbierto)

    // 4. Cambiamos íconos y textos accesibles según el estado
    if(estaAbierto) {
        $imagenBoton.src = "./recursos/imagenes/icono-cerrar-menu.svg"
        // NUEVO (A11y): Cambiamos la etiqueta del botón
        $boton.setAttribute("aria-label", "Cerrar menú de navegación")
    } else {
        $imagenBoton.src = "./recursos/imagenes/icono menú.svg"
        // NUEVO (A11y): Volvemos a la etiqueta original
        $boton.setAttribute("aria-label", "Abrir menú de navegación")
    }
})

function chequearAncho(e) {
    if (e.matches) {  
        // Pantalla >= 768px
        $menu.classList.remove("navegacion--abierta")
        $overlay.classList.remove("overlay-menu--abierto")
        document.body.classList.remove("no-scroll") // si bloqueás scroll
        $imagenBoton.src = "./recursos/imagenes/icono menú.svg"

        $boton.setAttribute("aria-expanded", "false")
        $boton.setAttribute("aria-label", "Abrir menú de navegación")
    }
}

mediaQuery.addEventListener("change", chequearAncho)