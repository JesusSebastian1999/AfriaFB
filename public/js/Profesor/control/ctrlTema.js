//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
import { error } from "../../../lib/util.js";
            const parametros = new URLSearchParams(location.search);
            const id = parametros.get("id");
            //Hacemos la coneccion a la base de datos de firebase 
            const firestore = firebase.firestore();
            firestore.enablePersistence()
              .catch(error)
              .then(busca);
            async function busca() {
              try {
                //Pormedio del firestore.collection recuperamos los datos de la tabla TEMAS
                const doc = await firestore.collection("TEMAS").doc(id).get();
                if (doc.exists) {
                  const modelo = doc.data();
                  document.title = modelo.TEMA_NOMBRE;
                  título.value = modelo.TEMA_NOMBRE;
                  tema.value = modelo.TEMA_NOMBRE;
                  vista.addEventListener("submit", modifica);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Tema no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function modifica(evt) {
              try {
                evt.preventDefault();
                const TEMA_NOMBRE = tema.value.trim();
                const modelo = { TEMA_NOMBRE};
                //Por medio del .set(modelo) modificamos los datos de la tabla TEMAS
                await firestore.collection("TEMAS").doc(id).set(modelo);
                document.location = "listaTemas.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                //Por medio del .delete eliminamos los datos de la tabla TEMAS
                await firestore.collection("TEMAS").doc(id).delete();
                document.location = "listaTemas.html";
              } catch (e) {
                error(e)
              }
            }