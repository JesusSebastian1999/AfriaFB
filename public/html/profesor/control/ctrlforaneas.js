export async function carga_grupos() {
 const querySnapshot = await firebase.firestore().collection("GRUPOS")
   .orderBy("GRUPO_NOMBRE").get();
 document.vista.grupo.cargada();
 document.vista.grupo.agrega({ id: "", texto: "Sin grupo" });
 querySnapshot.forEach(doc => document.vista.grupo.agrega(
   { id: doc.id, texto: doc.data().GRUPO_NOMBRE }));
}
