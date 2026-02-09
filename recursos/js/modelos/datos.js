/*
Declara una función que podrá usar "await" dentro.

La función devuelve una promesa mientras espera tareas lentas 
(como pedir datos a un servidor) y continúa cuando la respuesta llega. 

El programa puede seguir haciendo otras cosas: 
actualizar la interfaz, ejecutar otras funciones, etc.
Permite que la interfaz:
-siga respondiendo
-siga animada
-deje hacer clics
-permita escribir
-no se trabe ni se frene

Mientras tanto, la operación lenta (la petición a internet) se resuelve en segundo plano.
*/
async function obtenerDatos(url){ 

    const respuesta = await fetch(url) // Hace una petición a la URL y espera la respuesta del servidor. Devuelve un objeto Response, que internamente contiene datos en bytes (no legibles aún). Básicamente, trae los datos del JSON.
    
    const datos = await respuesta.json() // Lee esos bytes, los interpreta como texto JSON y convierte la respuesta a un objeto JavaScript. "Await" espera esa conversión antes de seguir.
    
    return datos // Devuelve ese objeto con los datos ya procesados
}

export {obtenerDatos} // Exporta la función para poder usarla en otros archivos