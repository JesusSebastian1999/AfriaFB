/** Render de usuarios.
 * @module */
 
//import { getArr, getRef } from "../lib/fireUtil.js";
import { cod, url,getArr, getRef } from "./lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("./infoUsuario").InfoUsuario} modelo 
 * @returns {Promise<import("./lib/LiRender").LiRender>}  */
export async function rendererUsuario(modelo) {
  /** @type {import("./infoPasatiempo").InfoPasatiempo} */
  const pasatiempo = (await getRef(modelo.GRUPO_ID)) || {};
  return {
    filtro:
      `email: ${modelo.EMAIL || ""}
       pasatiempo: ${pasatiempo.GRUPO_NOMBRE || ""}
       `,
    innerHTML: /* html */
      `
      <tr>
          <td><a>
          ${cod(modelo.EMAIL)+" "+cod(pasatiempo.GRUPO_NOMBRE)}
          </a></td>
          <td>
            <a href="alumno.html?id=${url(modelo.id)}" class="btn btn-warning btn-circle">
            <i class="fas fa-pen"></i>
            </a>
          </td>
      </tr>
      `
  };
}