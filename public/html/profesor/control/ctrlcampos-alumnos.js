import { copiaAttrBool } from "../../../lib/util.js";
customElements.define("campos-alumnos", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     `  <p>
        <label>
             <select is="foranea-basica" id="grupo">
            </select>
        </label>
        </p>
     `;
 }
});