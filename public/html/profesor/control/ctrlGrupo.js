import { error } from "../../../lib/util.js";
            const parametros = new URLSearchParams(location.search);
            const id = parametros.get("id");
            const firestore = firebase.firestore();
            firestore.enablePersistence()
              .catch(error)
              .then(busca);
            async function busca() {
              try {
                const doc = await firestore.collection("GRUPOS").doc(id).get();
                if (doc.exists) {
                  const modelo = doc.data();
                  document.title = modelo.GRUPO_NOMBRE;
                  título.value = modelo.GRUPO_NOMBRE;
                  grupo.value = modelo.GRUPO_NOMBRE;
                  vista.addEventListener("submit", guarda);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Pasatiempo no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function guarda(evt) {
              try {
                evt.preventDefault();
                const GRUPO_NOMBRE = grupo.value.trim();
                const modelo = { GRUPO_NOMBRE };
                await firestore.collection("GRUPOS").doc(id).set(modelo);
                document.location = "listaGrupo.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                await firestore.collection("GRUPOS").doc(id).delete();
                document.location = "listaGrupo.html";
              } catch (e) {
                error(e)
              }
            }