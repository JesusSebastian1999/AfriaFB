import { copiaAttrBool } from "../../../lib/util.js";
customElements.define("campos-alumnos", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     `  
             <select is="foranea-basica" id="grupo" name="dataTable_length" aria-controls="dataTable" class="form-control form-control-sm" required>
            </select>
     `;
 }
});