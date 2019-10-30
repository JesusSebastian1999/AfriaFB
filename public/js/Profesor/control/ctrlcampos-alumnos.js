//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
import { copiaAttrBool } from "../../../lib/util.js";
//Hacemos un select donde se mostrara los grupos existentes 
customElements.define("campos-alumnos", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     `  
             <select is="foranea-basica" id="grupo" name="dataTable_length" aria-controls="dataTable" class="form-control form-control-sm" required>
            </select>
     `;
 }
});
//Hacemos un select donde se mostrara los temas existentes
customElements.define("campos-temas", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     `  
             <select is="foranea-basica" id="tema" name="dataTable_length" aria-controls="dataTable" class="form-control form-control-sm" required>
            </select>
     `;
 }
});