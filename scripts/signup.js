window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    //las variables globales son las que vamos a utilizar en todo éste scripts
    const form = document.querySelector('#formSignUp');
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const correo = document.querySelector('#inputEmail');
    const contrasenia = document.querySelector('#inputPassword');
    const contraseñaRepetida = document.querySelector('#inputPasswordRepetida');
    const url = "https://ctd-todo-api.herokuapp.com/v1";
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */

    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //armamos el body de la request, preparamos un objeto con los datos del form p/ enviar
        const payload = {
            firstName: nombre.value,
            lastName: apellido.value,
            email: correo.value,
            password: contrasenia.value,
        }
        //configuramos  la request del fetch
        const settings = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        realizarRegister(settings);
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(`${url}/users`, settings)
            .then(response => {
                console.log(response);
                if (!response.ok) alert("Alguno de los datos es incorrecto.");
                return response.json();
            })
            .then(data => {
                console.log("Promesa cumplida.")
                console.log(data);
                if (data.jwt) {
                    //guardamos el token que me devuelve el backend
                    localStorage.setItem('jwt', JSON.stringify(data.jwt));
                    //aca usamos location para redirigir, o sea una vez logueado o registrado, nos deriva a la pagina de mis tareas para que haga lo que tenga que hacer
                    location.replace('./mis-tareas.html');
                }
            })
            .catch(err => {
                console.log("Promesa rechazada.");
                console.log(err);
            })




    };


});