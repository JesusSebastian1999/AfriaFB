import { hayUsuario, error } from "../lib/util.js";
            const icono = document.getElementById("icono");
            firebase.auth().onAuthStateChanged(
              user => {
                if (hayUsuario(user)) {
                  //document.vista.cue.value = user.email;
                  //document.vista.nombre.value = user.displayName;
                  icono.src = user.photoURL;
                  document.vista.terminaSesion.addEventListener("click", terminaSesion);
                } else {
                  document.location = "../../index.html";
                }
              },
              error);
            async function terminaSesion() {
              try {
                await firebase.auth().signOut();
              } catch (e) {
                error(e);
              }
            }