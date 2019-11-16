//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
import { hayUsuario, error, arr } from "./Profesor/lib/util.js";
customElements.define("form-navegacion", class extends HTMLElement {
  constructor() {
    super();
    this.iniciaSesion = this.iniciaSesion.bind(this);
  }
  
  connectedCallback() {
    this.innerHTML = /*html*/ `<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 98%">
    </div>
</div>` ;
    //this.textContent = "Cargando información de sesión…";
    //Aqui se validan los correos por medio de su rol
    firebase.auth().onAuthStateChanged(
      async user => {
        try {
          if (hayUsuario(user)) {
            const doc = await firebase.firestore().collection("PROFESORES")
              .doc(user.email.toUpperCase()).get();
            const roles = doc.exists ? arr(doc.data().ROL) : [];
            if (roles.indexOf("Profesor") >= 0) {
              this.innerHTML += /*html*/` 
                                        <li class="nav-item">
                                          <a class="nav-link" href="html/profesor/index.html"><i class="fas fa-user"></i>Profesor</a>
                                         </li>`;
            }
            if (roles.indexOf("Administrador") >= 0) {
              this.innerHTML += /*html*/` <li class="nav-item">
                                          <a class="nav-link" href="html/Administrador/index.html"><i class="fas fa-user"></i>Administrador</a>
                                         </li>`;
            }
          } else {
            this.innerHTML += /*html*/
              ` <input class="nav-item nav-link" type="button" value="Iniciar Sesión"
                      onclick="this.parentNode.iniciaSesion();">
                      `;
          }
        } catch (e) {
          error(e);
        }
      },
      error);
  }
  async iniciaSesion() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await firebase.auth().signInWithRedirect(provider);
      document.location = "index.html";
    } catch (e) {
      error(e);
    }
  }
});