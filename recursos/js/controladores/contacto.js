// 1. DOMContentLoaded: Esperamos a que todo el HTML (tu formulario) termine de cargar
// antes de intentar buscar elementos. Si no hacemos esto, el JS no encontrará el select.
document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Leemos la URL de la página actual para buscar el parámetro (ej: ?motivo=bodega)
    const parametrosUrl = new URLSearchParams(window.location.search);
    const motivo = parametrosUrl.get("motivo");

    // 3. Capturamos TU select usando el ID exacto que tenés en el HTML
    const $selectMotivo = document.getElementById("id-motivo");

    // 4. Verificamos que el select exista en esta página y que haya venido un motivo en la URL
    if (motivo && $selectMotivo) {
        
        let textoABuscar = "";

        // 5. Asignamos el texto EXACTO que tenés en las etiquetas <option> de tu HTML
        if (motivo === "bodega") {
            textoABuscar = "Quiero trabajar con Mini Wine";
        } else if (motivo === "mayorista") {
            textoABuscar = "Quiero obtener los precios mayoristas";
        }

        // 6. Si logramos identificar qué buscaba el usuario (bodega o mayorista)
        if (textoABuscar !== "") {
            
            // Convertimos las opciones del select en un arreglo (Array) para recorrerlas
            const opciones = Array.from($selectMotivo.options);
            
            // Recorremos cada <option>
            opciones.forEach(opcion => {
                // Comparamos el texto de la opción con nuestro texto a buscar
                if (opcion.text === textoABuscar) {
                    // ¡Match! Seleccionamos esta opción automáticamente
                    opcion.selected = true; 
                }
            });
        }
    }
});