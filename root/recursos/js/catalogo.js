import { obtenerDatos } from "./datos.js";
import { renderizarCatalogo } from "./renderizado.js";

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

function cargarFiltroBodegas(productos)
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

function cargarFiltroTipoVinos(productos){
    $filtroTipoVino.innerHTML= '<option value= "todos">Todas las bodegas</option>'

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
cargarFiltroTipoVinos(datos)
cargarFiltroBodegas(datos)
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

filtrarProductos();
