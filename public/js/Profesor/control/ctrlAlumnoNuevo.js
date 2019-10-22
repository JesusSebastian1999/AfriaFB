import { muestraError, error,url, cod  } from "../../../lib/util.js";
import { carga_grupos } from "./ctrlforaneas.js";
const firestore = firebase.firestore();
carga_foraneas();
async function carga_foraneas() {
 try {
   await carga_grupos();
   document.vista.addEventListener("submit", guarda);
 } catch (e) {
   muestraError(e)
   document.location = "listaAlumno.html";
 }
}
async function guarda(evt) {
 try {
   evt.preventDefault();
   const NOMBRES = document.vista.nombres.value.trim();
   const APELLIDO_PATERNO = document.vista.apellido_paterno.value.trim();
   const APELLIDO_MATERNO = document.vista.apellido_materno.value.trim();
   const EMAIL = document.vista.email.value.trim();
   const ROL = document.vista.rol.value;
   const ID_ALUMNO = EMAIL.toUpperCase();
   const usuRef = firestore.collection("ALUMNOS").doc(ID_ALUMNO);
   await firestore.runTransaction(async tx => {
     const doc = await tx.get(usuRef);
     if (doc.exists) {
       throw new Error("El alumno ya está registrado.");
     } else {
       await tx.set(usuRef, {
         GRUPO_NOMBRE: document.vista.grupo.value,
         NOMBRES,
         APELLIDO_PATERNO,
         APELLIDO_MATERNO,
         EMAIL,
         ROL
       });
     }
   });
   document.location = "listaAlumno.html";
 } catch (e) {
   muestraError(e);
 }
}

function consulta() {
  firebase.firestore().collection("ALUMNOS").onSnapshot(
      querySnapshot => {
          tb.innerHTML = "";
          querySnapshot.forEach(doc => {
              const modelo = doc.data();
              tb.innerHTML += /*html*/
                  `<tr>
                      <td><a>
                      ${cod(modelo.APELLIDO_PATERNO)+" "+cod(modelo.APELLIDO_MATERNO)+" "+cod(modelo.NOMBRES)}
                      </a></td>
                      <td>
                        <a href="alumno.html?id=${url(doc.id)}" class="btn btn-warning btn-circle">
                        <i class="fas fa-pen"></i>
                        </a>
                      </td>
                  </tr>`;
          });
      },
      error);
}
consulta();