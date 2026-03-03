import { obtenerDatos } from "../modelos/datos.js";
import { renderizarTextosInicio } from "../vistas/renderizado.js";

// 1. Pedimos los datos del inicio al Modelo
const textosInicio = await obtenerDatos("./datos/contenido_web/textos_inicio.json");

// 2. Mandamos a la Vista a dibujar
renderizarTextosInicio(textosInicio);