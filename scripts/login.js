window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const form = document.querySelector('#formLogin');
    const correo = document.querySelector('#inputEmail');
    const contrasenia = document.querySelector('#inputPassword');
    const url = "https://ctd-todo-api.herokuapp.com/v1";



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const payload = {
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

        realizarLogin(settings);
        form.reset();
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        fetch(`${url}/users/login`, settings)
            .then(response => {
                console.log(response);
                if (!response.ok) alert("El email o la contraseña, es incorrecta.");
                return response.json();
            })
            .then(data => {
                console.log("Promesa cumplida.")
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