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
                //Pormedio del firestore.collection recuperamos los datos de la tabla GRUPOS
                const doc = await firestore.collection("GRUPOS").doc(id).get();
                if (doc.exists) {
                  const modelo = doc.data();
                  document.title = modelo.GRUPO_NOMBRE;
                  título.value = modelo.GRUPO_NOMBRE;
                  grupo.value = modelo.GRUPO_NOMBRE;
                  vista.addEventListener("submit", modifica);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Pasatiempo no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function modifica(evt) {
              try {
                evt.preventDefault();
                const GRUPO_NOMBRE = grupo.value.trim();
                const id = GRUPO_NOMBRE;
                const modelo = { GRUPO_NOMBRE};
                //Por medio del .set(modelo) modificamos los datos de la tabla GRUPOS
                await firestore.collection("GRUPOS").doc(id).set(modelo);
                document.location = "listaGrupo.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                //Por medio del .delete eliminamos los datos de la tabla GRUPOS
                await firestore.collection("GRUPOS").doc(id).delete();
                document.location = "listaGrupo.html";
              } catch (e) {
                error(e)
              }
            }