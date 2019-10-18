import { error, url, cod } from "../../../lib/util.js";
                        const firestore = firebase.firestore();
                        firestore.enablePersistence()
                            .catch(error)
                            .then(consulta);
                        function consulta() {
                            firebase.firestore().collection("ALUMNOS").onSnapshot(
                                querySnapshot => {
                                    tb.innerHTML = "";
                                    querySnapshot.forEach(doc => {
                                        const modelo = doc.data();
                                        tb.innerHTML += /*html*/
                                            `<tr>
                                                <td><a href="alumno.html?id=${url(doc.id)}">
                                                ${cod(modelo.NOMBRES)}
                                                </a></td>
                                            </tr>`;
                                    });
                                },
                                error);
                        }