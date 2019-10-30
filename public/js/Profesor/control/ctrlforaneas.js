//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
export async function carga_grupos() {
  //En esta linea creamos la consulta de latabla GRUPOS y lo ordenamos por el nombre del grupo 
 const querySnapshot = await firebase.firestore().collection("GRUPOS")
   .orderBy("GRUPO_NOMBRE").get();
  //Se agrega en una etiqueta option un id vacion con un texto por default 
  //y se agrega de la consulta el id del grupo junto con su nombre
 document.vista.grupo.cargada();
 document.vista.grupo.agrega({ id: "", texto: "Sin grupo" });
 querySnapshot.forEach(doc => document.vista.grupo.agrega(
   { id: doc.id, texto: doc.data().GRUPO_NOMBRE }));
}
export async function carga_temas() {
  //En esta linea creamos la consulta de latabla TEMAS y lo ordenamos por el nombre del tema 
 const querySnapshot = await firebase.firestore().collection("TEMAS")
   .orderBy("TEMA_NOMBRE").get();
  //Se agrega en una etiqueta option un id vacion con un texto por default 
  //y se agrega de la consulta el id del tema junto con su nombre
 document.vista.tema.cargada();
 document.vista.tema.agrega({ id: "", texto: "Sin tema" });
 querySnapshot.forEach(doc => document.vista.tema.agrega(
   { id: doc.id, texto: doc.data().TEMA_NOMBRE }));
}

