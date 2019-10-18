import { error } from "../../../lib/util.js";
            const firestore = firebase.firestore();
            firestore.enablePersistence()
              .catch(error)
              .then(() => vista.addEventListener("submit", guarda));
            async function guarda(evt) {
              try {
                evt.preventDefault();
                const GRUPO_NOMBRE = grupo.value.trim();
                const modelo = { GRUPO_NOMBRE };
                await firestore.collection("GRUPOS").add(modelo);
                document.location = "listaGrupo.html";
              } catch (e) {
                error(e)
              }
            }