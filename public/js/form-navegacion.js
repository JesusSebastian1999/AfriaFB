import { hayUsuario, muestraError, arr } from "../lib/util.js";
customElements.define("form-navegacion", class extends HTMLElement {
 constructor() {
   super();
   this.iniciaSesion = this.iniciaSesion.bind(this);
 }
 connectedCallback() {
   //this.textContent = "Cargando información de sesión…";
   firebase.auth().onAuthStateChanged(
     async user => {
       try {
         if (hayUsuario(user)) {
           const doc = await firebase.firestore().collection("PROFESORES")
             .doc(user.email.toUpperCase()).get();
           const roles = doc.exists ? arr(doc.data().ROL) : [];
           if (roles.indexOf("Profesor") >= 0) {
             this.innerHTML += /*html*/` <li class="nav-item">
                                          <a class="nav-link" href="html/profesor/index.html"><i class="fas fa-user"></i>Profesor</a>
                                         </li>`;
           }
           if (roles.indexOf("Invitado") >= 0) {
             this.innerHTML += /*html*/` <a href="invitados.html">Invitados</a>`;
           }
         } else {
           this.innerHTML += /*html*/
             ` <input class="nav-item nav-link" type="button" value="Iniciar Sesión"
                      onclick="this.parentNode.iniciaSesion();">
                      `;
         }
       } catch (e) {
         muestraError(e);
       }
     },
     muestraError);
 }
 async iniciaSesion() {
   try {
     const provider = new firebase.auth.GoogleAuthProvider();
     provider.setCustomParameters({ prompt: "select_account" });
     await firebase.auth().signInWithRedirect(provider);
     document.location = "index.html";
   } catch (e) {
     muestraError(e);
   }
 }
});