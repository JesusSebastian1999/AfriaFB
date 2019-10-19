import { muestraError } from "../../../lib/util.js";
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
   const ID_ALUMNO = EMAIL.toUpperCase();
   const usuRef = firestore.collection("ALUMNOS").doc(ID_ALUMNO);
   await firestore.runTransaction(async tx => {
     const doc = await tx.get(usuRef);
     if (doc.exists) {
       throw new Error("El alumno ya está registrado.");
     } else {
       await tx.set(usuRef, {
         GRUPO_NOMBRE: document.vista.grupo.valor,
         NOMBRES,
         APELLIDO_PATERNO,
         APELLIDO_MATERNO,
         EMAIL
       });
     }
   });
   document.location = "listaAlumno.html";
 } catch (e) {
   muestraError(e);
 }
}