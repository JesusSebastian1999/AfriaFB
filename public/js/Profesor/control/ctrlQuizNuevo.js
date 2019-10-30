//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
//Importamos util.js paro los erres y evitar que iserten codigo
import { muestraError, error,url, cod  } from "../../../lib/util.js";
//Importamos ctrlForaneas.js, donde se va hacer la consulta de la tabla Grupos
import { carga_temas } from "./ctrlforaneas.js";
const firestore = firebase.firestore();
//Mandamos a llamar a la funcion carga_foraneas
carga_foraneas();
async function carga_foraneas() {
 try {
   //Si se carga correctamente la funcion, le añadira un evento llamado guardar
   await carga_temas();
   document.vista.addEventListener("submit", guarda);
 } catch (e) {
   //Si no carga correctamente la funcion, le mostrara el error en la consola i lo regresara a listaAlumno.html
   muestraError(e)
   document.location = "listaQuiz.html";
 }
}
async function guarda(evt) {
 try {
   evt.preventDefault();
   //Creamos las const junto con los nombres de los atributos que tiene la tabla
   //PREGUNTAS las cuales son PREGUNTA, RESPUESTA_CORRECTA, etc.
   //los datos lo recuperamos por medio de la linea de codigo "document.vista.pregunta" y
   //los datos se los asignamos a los atributos de la tabla antes mencionadad
   const PREGUNTA = document.vista.pregunta.value.trim();
   const RESPUESTA_CORRECTA = document.vista.respuesta_correcta.value.trim();
   const RESPUESTA_A = document.vista.respuesta_a.value.trim();
   const RESPUESTA_B = document.vista.respuesta_b.value.trim();
   const RESPUESTA_C = document.vista.respuesta_c.value.trim();
   const usuRef = firestore.collection("PREGUNTAS").doc();
   await firestore.runTransaction(async tx => {
     const doc = await tx.get(usuRef);
     if (doc.exists) {
       //Si la pregunta existe se le mostrara en la pagina un mensaje diciendo que el alumno ya esta registrado
       throw new Error("La pregunta ya está registrado.");
     } else {
       await tx.set(usuRef, {
         //Si no existe, se agregaran las const que creamos anterior mente
         //Y agregamos el grupo que se haya seleccionado 
         TEMA_NOMBRE: document.vista.tema.value,
         PREGUNTA,
         RESPUESTA_CORRECTA,
         RESPUESTA_A,
         RESPUESTA_B,
         RESPUESTA_C
       });
     }
   });
   //Con esta linea de codigo te regresa al listarQuiz.html
   document.location = "listaQuiz.html";
 } catch (e) {
   //En caso de dar error, esta linea muestrta el error en la consola
   muestraError(e);
 }
}

function consulta() {
  //En esta linea hacemos la consulta de la tabla PREGUNTAS
  firebase.firestore().collection("PREGUNTAS").onSnapshot(
      querySnapshot => {
          tb.innerHTML = "";
          querySnapshot.forEach(doc => {
              const modelo = doc.data();
              //En estas lineas le decimos que nos recupere de la tabla las preguntas y respuestas de PREGUNTAS
              //y que nos lo muestre en la tabla.
              //tambien le decimos que nos recupere de la tabla el id y que lo pone dentro del href pora haci poder ver los datos de las PREGUNTAS
              tb.innerHTML += /*html*/
                  `<tr>
                      <td><a>
                      ${cod(modelo.PREGUNTA)}
                      </a></td>
                      <td>
                        <a href="Quiz.html?id=${url(doc.id)}" class="btn btn-warning btn-circle">
                        <i class="fas fa-pen"></i>
                        </a>
                      </td>
                  </tr>`;
          });
      },
      error);
}
consulta();