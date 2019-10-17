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
   document.location = "";
 }
}
async function guarda(evt) {
 try {
   evt.preventDefault();
   const USU_ID = document.vista.cue.value.trim();
   const USU_UP_ID = USU_ID.toUpperCase();
   const usuRef = firestore.collection("USUARIO").doc(USU_UP_ID);
   await firestore.runTransaction(async tx => {
     const doc = await tx.get(usuRef);
     if (doc.exists) {
       throw new Error("El cue ya está registrado.");
     } else {
       await tx.set(usuRef, {
         PAS_ID: document.vista.pasatiempo.valor,
         ROL_IDS: document.vista.roles.valor,
         USU_ID
       });
     }
   });
   await usuRef.update(
     { USU_AVATAR: await document.vista.avatar.subeArchivo(USU_UP_ID) });
   document.location = "index.html";
 } catch (e) {
   muestraError(e);
 }
}