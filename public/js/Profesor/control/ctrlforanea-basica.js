import { eh } from "../../../lib/util.js";
customElements.define("foranea-basica", class extends HTMLSelectElement {
 constructor() {
   super();
   this.classList.add("cargando");
 }
 cargada() {
   this.classList.remove("cargando");
   this.classList.add("vacia");
   this.innerHTML = "";
 }
 agrega(fila) {
   this.classList.remove("vacia");
   this.innerHTML += /*html*/
     `<option value="${eh(fila.id)}">${eh(fila.texto)}</option>`;
 }
 get valor() {
   if (this.multiple) {
     const valores = [];
     for (const option of this.selectedOptions) {
       valores.push(option.value);
     }
     return valores;
   } else {
     return this.value ? this.value : null;
   }
 }
 set valor(valor) {
   if (this.multiple) {
     for (const option of this.options) {
       option.selected = valor && valor.indexOf(option.value) >= 0;
     }
   } else {
     this.value = valor;
   }
 }
},
{extends: 'select'});