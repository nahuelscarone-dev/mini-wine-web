import { obtenerDatos } from "./datos.js";
import { renderizarCatalogo } from "./renderizado.js";
import { agregarAlCarrito } from "./carrito.js";

const datos = await obtenerDatos("./datos/catalogo.json");
const $contenedor = document.getElementById("seccion-productos")
const $filtroPresentacion = document.getElementById("id-presentacion")
const $filtroTipoVino = document.getElementById("id-tipo-vino") 
const $filtroBodega= document.getElementById("id-bodega")

$filtroPresentacion.addEventListener("change", () => {
    controlSelect();
    filtrarProductos();
})

$filtroTipoVino.addEventListener("change", filtrarProductos)
$filtroBodega.addEventListener("change", filtrarProductos)

function agregarListenersBotonesCarrito() {
    // 1. Seleccionar todos los botones con la clase específica que pusimos en renderizado.js
    const botonesAgregar = document.querySelectorAll('.boton--agregar-al-carrito');

    botonesAgregar.forEach(boton => {
        // 2. Añadir un listener para el evento 'click' a cada botón
        boton.addEventListener('click', (e) => {
            // 3. Obtener el ID del producto desde el atributo data-id del botón
            const idProducto = e.currentTarget.dataset.id;

            // 4. Buscar el objeto producto completo en nuestro array 'datos'
            // Usamos '==' para comparar por si el ID es número y el dataset es string
            const productoSeleccionado = datos.find(producto => producto.id == idProducto);

            // 5. Si encontramos el producto, llamamos a la función del carrito
            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado);
                console.log(`Producto agregado: ${productoSeleccionado.nombre}`);
                // Opcional: Podrías abrir el carrito aquí si lo deseas
                // import { abrirCarrito } from "./carrito.js";
                // abrirCarrito();
            }
        });
    });
}

function cargarSelectBodegas(productos)
{
    //Limpiamos opciones viejas dejando la que se encuentre por defecto
    $filtroBodega.innerHTML= '<option value= "todas">Todas las bodegas</option>'

    //Obtenemos la lista de nombre de bodegas
    const listaBodegas= productos.map(producto => producto.bodega)

    //Set sirve para eliminar duplicados automáticamente
    const bodegasUnicas = [...new Set(listaBodegas)]

    bodegasUnicas.forEach(bodega =>{

        // El if(bodega) evita que se agreguen opciones vacías (como las de los Packs
        if(bodega){
            const option= document.createElement('option') 
            option.value = bodega
            option.textContent= bodega
            $filtroBodega.appendChild(option)
        }
    })
}

function cargarSelectTipoVinos(productos){
    $filtroTipoVino.innerHTML= '<option value= "todos">Todos los tipos</option>'

    const listaTiposVinos= productos.map(producto=>producto.tipo)

       const tiposVinoUnicos = [...new Set(listaTiposVinos)]
    
    tiposVinoUnicos.forEach(tipoVino=>{
        if(tipoVino){
            const option= document.createElement('option')
            option.value= tipoVino
            option.textContent= tipoVino
            $filtroTipoVino.appendChild(option)
        }
    })
}
function filtrarProductos() {

    const presentacionElegida = Number($filtroPresentacion.value)
    const tipoVinoElegido = $filtroTipoVino.value
    const bodegaElegida = $filtroBodega.value

    let datosFiltrados = [...datos]

    //packs = -1, individual= 1, todos= 0 
    if(presentacionElegida !== 0) {

        if(presentacionElegida===-1){
            datosFiltrados= datosFiltrados.filter(producto=>producto.presentacion>1
            )
        }
        else{datosFiltrados = datosFiltrados.filter(
            producto => producto.presentacion === presentacionElegida
        )}
    }

    if(tipoVinoElegido !== "todos") {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.tipo === tipoVinoElegido
        )
    }

    if(bodegaElegida!=="todas"){
        datosFiltrados= datosFiltrados.filter(producto=>producto.bodega== bodegaElegida)
    }

    renderizarCatalogo(datosFiltrados, $contenedor)

    agregarListenersBotonesCarrito()
}

function controlSelect() {
    if($filtroPresentacion.value === "-1"){
        $filtroTipoVino.value = "todos"
        $filtroTipoVino.disabled = true

        $filtroBodega.value="todas"
        $filtroBodega.disabled=true
    } else {
        $filtroTipoVino.disabled = false
        $filtroBodega.disabled= false
    }
}

cargarSelectTipoVinos(datos)
cargarSelectBodegas(datos)
filtrarProductos();
