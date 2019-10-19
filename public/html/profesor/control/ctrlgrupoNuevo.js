import { error } from "../../../lib/util.js";
            const firestore = firebase.firestore();
            firestore.enablePersistence()
              .catch(error)
              .then(() => vista.addEventListener("submit", guarda));
            async function guarda(evt) {
              try {
                evt.preventDefault();
                const GRUPO_NOMBRE = grupo.value.trim();
                const ID_GRUPO = GRUPO_NOMBRE.toUpperCase();
                const usuRef = firestore.collection("GRUPOS").doc(ID_GRUPO);
                await firestore.runTransaction(async tx => {
                  const doc = await tx.get(usuRef);
                  if (doc.exists) {
                    throw new Error("El grupo ya está registrado.");
                  } else {
                    await tx.set(usuRef, {
                      GRUPO_NOMBRE
                    });
                  }
                });
                document.location = "listaGrupo.html";


              } catch (e) {
                error(e)
              }
            }