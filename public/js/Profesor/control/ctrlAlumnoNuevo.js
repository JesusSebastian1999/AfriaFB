//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
//Importamos util.js paro los erres y evitar que iserten codigo
import { muestraError, error,url, cod  } from "../../../lib/util.js";
//Importamos ctrlForaneas.js, donde se va hacer la consulta de la tabla Grupos
import { carga_grupos } from "./ctrlforaneas.js";
const firestore = firebase.firestore();
//Mandamos a llamar a la funcion carga_foraneas
carga_foraneas();
async function carga_foraneas() {
 try {
   //Si se carga correctamente la funcion, le añadira un evento llamado guardar
   await carga_grupos();
   document.vista.addEventListener("submit", guarda);
 } catch (e) {
   //Si no carga correctamente la funcion, le mostrara el error en la consola i lo regresara a listaAlumno.html
   muestraError(e)
   document.location = "listaAlumno.html";
 }
}
async function guarda(evt) {
 try {
   evt.preventDefault();
   //Creamos las const junto con los nombres de los atributos que tiene la tabla
   //ALUMNOS las cuales son NOMBRES, APELLIDO_PATERNO, etc.
   //los datos lo recuperamos por medio de la linea de codigo "document.vista.nombre" y
   //los datos se los asignamos a los atributos de la tabla antes mencionadad
   const NOMBRES = document.vista.nombres.value.trim();
   const APELLIDO_PATERNO = document.vista.apellido_paterno.value.trim();
   const APELLIDO_MATERNO = document.vista.apellido_materno.value.trim();
   const EMAIL = document.vista.email.value.trim();
   const ROL = document.vista.rol.value;
   const ID_ALUMNO = EMAIL.toUpperCase();
   const usuRef = firestore.collection("ALUMNOS").doc(ID_ALUMNO);
   await firestore.runTransaction(async tx => {
     const doc = await tx.get(usuRef);
     if (doc.exists) {
       //Si el alumno existe se le mostrara en la pagina un mensaje diciendo que el alumno ya esta registrado
       throw new Error("El alumno ya está registrado.");
     } else {
       await tx.set(usuRef, {
         //Si no existe, se agregaran las const que creamos anterior mente
         //Y agregamos el grupo que se haya seleccionado 
         GRUPO_NOMBRE: document.vista.grupo.value,
         NOMBRES,
         APELLIDO_PATERNO,
         APELLIDO_MATERNO,
         EMAIL,
         ROL
       });
     }
   });
   //Con esta linea de codigo te regresa al listarAlumno.html
   document.location = "listaAlumno.html";
 } catch (e) {
   //En caso de dar error, esta linea muestrta el error en la consola
   muestraError(e);
 }
}

function consulta() {
  //En esta linea hacemos la consulta de la tabla ALUMNOS
  firebase.firestore().collection("ALUMNOS").onSnapshot(
      querySnapshot => {
          tb.innerHTML = "";
          querySnapshot.forEach(doc => {
              const modelo = doc.data();
              //En estas lineas le decimos que nos recupere de la tabla los nombres y apellidos de alumno
              //y que nos lo muestre en la tabla.
              //tambien le decimos que nos recupere de la tabla el id y que lo pone dentro del href pora haci poder ver los datos del alumno
              tb.innerHTML += /*html*/
                  `<tr>
                      <td><a>
                      ${cod(modelo.APELLIDO_PATERNO)+" "+cod(modelo.APELLIDO_MATERNO)+" "+cod(modelo.NOMBRES)}
                      </a></td>
                      <td>
                        <a href="alumno.html?id=${url(doc.id)}" class="btn btn-warning btn-circle">
                        <i class="fas fa-pen"></i>
                        </a>
                      </td>
                  </tr>`;
          });
      },
      error);
}
consulta();