//import Swal from "sweetalert";
//Importamos util.js paro los erres y evitar que iserten codigo
import { error, url, cod } from "../../../lib/util.js";
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
                //Con esta linea de codigo te regresa al listarGrupo.html
                document.location = "listaGrupo.html";


              } catch (e) {
                //En caso de dar error, esta linea muestrta el error en la consola
                error(e)
              }
            }
            
                        
            function consulta() {
                // En esta linea hacemos la consulta de la tabla de GRUPOS
                firebase.firestore().collection("GRUPOS").onSnapshot(
                    querySnapshot => {
                        tb.innerHTML = "";
                        querySnapshot.forEach(doc => {
                            const modelo = doc.data();
                            //En estas lineas le decimos que nos recupere de la tabla el nombre del grupo y la muestra en la tabla
                            //tambien le decimos que nos recupere de la tabla el id que se va a poner dentro del href para pode visualizar los datos del grupo
                            tb.innerHTML += /*html*/
                                `<tr>
                                    <td><a>
                                    ${cod(modelo.GRUPO_NOMBRE)}
                                    </a></td>
                                    <td>
                                      <a href="grupo.html?id=${url(doc.id)}" class="btn btn-warning btn-circle">
                                      <i class="fas fa-pen"></i>
                                      </a>
                                    </td>
                                </tr>`;
                        });
                    },
                    error);
            }

            consulta();