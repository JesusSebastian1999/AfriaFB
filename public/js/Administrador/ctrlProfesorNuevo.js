import { error, url, cod } from "../../lib/util.js";
            const firestore = firebase.firestore();
            firestore.enablePersistence()
              .catch(error)
              .then(() => vista.addEventListener("submit", guarda));
            async function guarda(evt) {
              try {
                evt.preventDefault();
                const NOMBRES = document.vista.nombres.value.trim();
                const APELLIDO_PATERNO = document.vista.apellido_paterno.value.trim();
                const APELLIDO_MATERNO = document.vista.apellido_materno.value.trim();
                const EMAIL = document.vista.email.value.trim();
                const ROL = document.vista.rol.value;
                const MATRICULA = document.vista.matricula.value.trim();
                const ID_PROFE = EMAIL.toUpperCase();
                const usuRef = firestore.collection("PROFESORES").doc(ID_PROFE);
                await firestore.runTransaction(async tx => {
                    const doc = await tx.get(usuRef);
                    if (doc.exists) {
                    throw new Error("El Profesor ya está registrado.");
                    } else {
                    await tx.set(usuRef, {
                        NOMBRES,
                        APELLIDO_PATERNO,
                        APELLIDO_MATERNO,
                        EMAIL,
                        ROL,
                        MATRICULA
                    });
                    }
                });
                document.location = "listaProfesores.html";


              } catch (e) {
                error(e)
              }
            }
            
                        
            function consulta() {
                firebase.firestore().collection("PROFESORES").onSnapshot(
                    querySnapshot => {
                        tb.innerHTML = "";
                        querySnapshot.forEach(doc => {
                            const modelo = doc.data();
                            tb.innerHTML += /*html*/
                                `<tr>
                                <td><a>
                                ${cod(modelo.NOMBRES)+" "+cod(modelo.APELLIDO_PATERNO)+" "+cod(modelo.APELLIDO_MATERNO)}
                                </a></td>
                                <td>
                                  <a href="profesor.html?id=${url(doc.id)}" class="btn btn-warning btn-circle">
                                  <i class="fas fa-pen"></i>
                                  </a>
                                </td>
                            </tr>`;
                        });
                    },
                    error);
            }

            consulta();