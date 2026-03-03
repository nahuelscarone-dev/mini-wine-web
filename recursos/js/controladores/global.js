import { obtenerDatos } from "../modelos/datos.js";
import { renderizarFooter } from "../vistas/renderizado.js";

const $logoFooter = document.getElementById("img-logo-footer");
const $contenedorRedes = document.getElementById("contenedor-redes-footer");

// 1. Pedimos los datos al Modelo
const datosGlobales = await obtenerDatos("./datos/contenido_web/globales.json");

// 2. Mandamos a dibujar a la Vista
renderizarFooter(datosGlobales, $logoFooter, $contenedorRedes);

// 3. Calculamos y exportamos el WhatsApp para otros controladores (como el carrito)
const linkWhatsApp = datosGlobales.enlaces_contacto.find(red => red.plataforma.toLowerCase() === "whatsapp");
export const numeroWhatsApp = linkWhatsApp ? linkWhatsApp.url.replace(/\D/g, '') : "5493518519953";