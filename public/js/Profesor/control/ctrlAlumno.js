//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
import { error, texto } from "../../../lib/util.js";
import { carga_grupos} from "./ctrlforaneas.js";
            const parametros = new URLSearchParams(location.search);
            const ID_ALUMNO = parametros.get("id");
            //Hacemos la coneccion a la base de datos de firebase 
            const firestore = firebase.firestore();
            busca();
            async function busca() {
              try {
                //Pormedio del firestore.collection recuperamos los datos de la tabla ALUMNOS
                const doc = await firestore.collection("ALUMNOS").doc(ID_ALUMNO).get();
                if (doc.exists) {
                  await carga_grupos();
                  const modelo = doc.data();
                  document.vista.grupo.valor = texto(modelo.GRUPO_NOMBRE);
                  document.vista.nombres.value = modelo.NOMBRES;
                  document.vista.apellido_paterno.value = modelo.APELLIDO_PATERNO;
                  document.vista.apellido_materno.value = modelo.APELLIDO_MATERNO;
                  document.vista.email.value = modelo.EMAIL;
                  document.vista.título.value = modelo.NOMBRES;  
                  vista.addEventListener("submit", modifica);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Pasatiempo no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function modifica(evt) {
              try {
                evt.preventDefault();
                const NOMBRES = vista.nombres.value.trim();
                const APELLIDO_PATERNO = vista.apellido_paterno.value.trim();
                const APELLIDO_MATERNO = vista.apellido_materno.value.trim();
                const EMAIL = vista.email.value.trim();
                const GRUPO_NOMBRE = vista.grupo.value;
                const modelo = { NOMBRES,APELLIDO_PATERNO,APELLIDO_MATERNO,EMAIL,GRUPO_NOMBRE};
                //Por medio del .set(modelo) modificamos los datos de la tabla ALUMNOS               
                await firestore.collection("ALUMNOS").doc(ID_ALUMNO).set(modelo);
                document.location = "listaAlumno.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                //Por medio del .delete eliminamos los datos de la tabla ALUMNOS
                await firestore.collection("ALUMNOS").doc(ID_ALUMNO).delete();
                document.location = "listaAlumno.html";
              } catch (e) {
                error(e)
              }
            }