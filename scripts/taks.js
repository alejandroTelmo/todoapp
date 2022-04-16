// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) location.replace('./index.html');

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp')
  const userName = document.querySelector('#userName');
  const url = "https://ctd-todo-api.herokuapp.com/v1";
  const token = JSON.parse(localStorage.jwt);
  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm('Esta seguro de cerrar sesión ?');
    if (cerrarSesion) {
      localStorage.clear();
      location.replace('./index.html');
    }



  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }
    fetch(`${url}/users/getMe`, settings)
      .then(response => response.json())
      //debo retornarlo xq sino me da undefined,
      //si no esta en la primera linea, debo retornarlo con un return
      .then(data => userName.innerHTML = data.firstName)
      .catch(err => {
        console.log("Nombre usuario NO ");
        console.log(err);
      })



  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }
    fetch(`${url}/tasks`, settings)
      .then(response => {
        console.log(response);

        return response.json();
      })
      .then(data => data)
      .catch(err => {
        console.log("Promesa rechazada.");
        console.log(err);
      })




  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {





  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {





  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {





  };

});