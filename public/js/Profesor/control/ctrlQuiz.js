//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
import { error, texto } from "../../../lib/util.js";
import { carga_temas} from "./ctrlforaneas.js";
            const parametros = new URLSearchParams(location.search);
            const id = parametros.get("id");
            //Hacemos la coneccion a la base de datos de firebase
            const firestore = firebase.firestore();
            busca();
            async function busca() {
              try {
                //Pormedio del firestore.collection recuperamos los datos de la tabla PREGUNTAS
                const doc = await firestore.collection("PREGUNTAS").doc(id).get();
                if (doc.exists) {
                  await carga_temas();
                  const modelo = doc.data();
                  document.vista.tema.valor = texto(modelo.TEMA_NOMBRE);
                  document.vista.pregunta.value = modelo.PREGUNTA;
                  document.vista.respuesta_correcta.value = modelo.RESPUESTA_CORRECTA;
                  document.vista.respuesta_a.value = modelo.RESPUESTA_A;
                  document.vista.respuesta_b.value = modelo.RESPUESTA_B;
                  document.vista.respuesta_c.value = modelo.RESPUESTA_C;
                  document.vista.título.value = modelo.PREGUNTA;  
                  vista.addEventListener("submit", modifica);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Pregunta no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function modifica(evt) {
              try {
                evt.preventDefault();
                const PREGUNTA = vista.pregunta.value.trim();
                const RESPUESTA_CORRECTA = vista.respuesta_correcta.value.trim();
                const RESPUESTA_A = vista.respuesta_a.value.trim();
                const RESPUESTA_B = vista.respuesta_b.value.trim();
                const RESPUESTA_C = vista.respuesta_c.value.trim();
                const TEMA_NOMBRE = vista.tema.value;
                const modelo = { PREGUNTA,RESPUESTA_CORRECTA,RESPUESTA_A,RESPUESTA_B,RESPUESTA_C,TEMA_NOMBRE};
                //Por medio del .set(modelo) modificamos los datos de la tabla PREGUNTAS
                await firestore.collection("PREGUNTAS").doc(id).set(modelo);
                document.location = "listaAlumno.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                //Por medio del .delete eliminamos los datos de la tabla PREGUNTAS
                await firestore.collection("PREGUNTAS").doc(ID_ALUMNO).delete();
                document.location = "listaAlumno.html";
              } catch (e) {
                error(e)
              }
            }