import { op } from "./Op.js";
 
/** Muestra una instancia de Error en la consola y muestra un diálogo
 * alert con la propiedad message del objeto.
 * @param {Error} e instancia que contiene el error. */
export function error(e) {
  console.error(e);
  alert(e.message);
}
 
/** Codifica un texto para que escape los caracteres especiales para que no se
 * pueda interpretar como HTML.
 * @param {*} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  let div = document.createElement('div');
  div.innerText = op(texto).get().toString();
  return div.innerHTML;
}
 
/** Codifica una url para su uso en html.
 * @param {string} u url codificada. */
export function url(u) {
  return cod(encodeURIComponent(u));
}

export function texto(s, p) {
  return s ? s : (p ? p : "");
 }
 export function arr(a) {
  return a ? a : [];
 }
 export function muestraError(e) {
  console.error(e);
  alert(e.message);
 }
 export function eh(texto) {
  let div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
 }
 export function copiaAttr(element, atributo, atributoNuevo, predeterminado) {
  const attr = eh(texto(atributoNuevo, atributo));
  return element.hasAttribute(atributo)
    ? `${attr}="${eh(element.getAttribute(atributo))}"`
    : (predeterminado ? `${attr}="${eh(texto(predeterminado))}"` : "");
 }
 export function copiaAttrBool(origen, atributo, atributoNuevo) {
  return origen.hasAttribute(atributo) ? eh(texto(atributoNuevo, atributo)) : "";
 }
//InicioSesion
export function interseccion(a, b) {
  const arrA = arr(a);
  const arrB = arr(b);
  return arrA.filter(elemA => arrB.indexOf(elemA) >= 0);
 }
 export function hayUsuario(user) {
  return user && user.email;
 }
 export function protege(PROFESORES) {
  return new Promise((resolve, reject) => {
    if (!PROFESORES || PROFESORES.length === 0) {
      resolve();
    } else {
      firebase.auth().onAuthStateChanged(
        async user => {
          try {
            if (hayUsuario(user)) {
              const doc = await firebase.firestore().collection("PROFESORES")
                .doc(user.email.toUpperCase()).get();
              if (doc.exists && interseccion(PROFESORES, doc.data().ROL).length > 0) {
                resolve();
              } else {
                throw new Error("No autorizado.");               
              }
            } else {
              throw new Error("Falta iniciar sesión.");
            }
          } catch (e) {
            reject(e);
          }
        },
        reject);
    }
  });
 }
//Fin inicio sesion 