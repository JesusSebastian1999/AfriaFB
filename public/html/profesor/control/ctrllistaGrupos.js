import { error, url, cod } from "../../../lib/util.js";
                        const firestore = firebase.firestore();
                        firestore.enablePersistence()
                            .catch(error)
                            .then(consulta);
                        function consulta() {
                            firebase.firestore().collection("GRUPOS").onSnapshot(
                                querySnapshot => {
                                    tb.innerHTML = "";
                                    querySnapshot.forEach(doc => {
                                        const modelo = doc.data();
                                        tb.innerHTML += /*html*/
                                            `<tr>
                                                <td><a href="grupo.html?id=${url(doc.id)}">
                                                ${cod(modelo.GRUPO_NOMBRE)}
                                                </a></td>
                                            </tr>`;
                                    });
                                },
                                error);
                        }