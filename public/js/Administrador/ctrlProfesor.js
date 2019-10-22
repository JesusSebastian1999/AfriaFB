import { error, texto } from "../../lib/util.js";
            const parametros = new URLSearchParams(location.search);
            const ID_PROFE = parametros.get("id");
            const firestore = firebase.firestore();
            busca();
            async function busca() {
              try {
                const doc = await firestore.collection("PROFESORES").doc(ID_PROFE).get();
                if (doc.exists) {
                  const modelo = doc.data();
                  document.vista.nombres.value = modelo.NOMBRES;
                  document.vista.apellido_paterno.value = modelo.APELLIDO_PATERNO;
                  document.vista.apellido_materno.value = modelo.APELLIDO_MATERNO;
                  document.vista.email.value = modelo.EMAIL;
                  document.vista.matricula.value = modelo.MATRICULA;
                  document.vista.rol.valor = texto(modelo.ROL);
                  document.vista.título.value = modelo.NOMBRES;  
                  vista.addEventListener("submit", guarda);
                  eliminar.addEventListener("click", elimina);
                } else {
                  alert("Profesor no encontrado");
                }
              } catch (e) {
                error(e)
              }
            }
            async function guarda(evt) {
              try {
                evt.preventDefault();
                const NOMBRES = vista.nombres.value.trim();
                const APELLIDO_PATERNO = vista.apellido_paterno.value.trim();
                const APELLIDO_MATERNO = vista.apellido_materno.value.trim();
                const EMAIL = vista.email.value.trim();
                const MATRICULA = document.vista.matricula.value.trim();
                const ROL = document.vista.rol.value;
                const modelo = { NOMBRES,APELLIDO_PATERNO,APELLIDO_MATERNO,EMAIL,MATRICULA,ROL};
                await firestore.collection("PROFESORES").doc(ID_PROFE).set(modelo);
                document.location = "listaProfesores.html";
              } catch (e) {
                error(e)
              }
            }
            async function elimina() {
              try {
                await firestore.collection("PROFESORES").doc(ID_PROFE).delete();
                document.location = "listaProfesores.html";
              } catch (e) {
                error(e)
              }
            }