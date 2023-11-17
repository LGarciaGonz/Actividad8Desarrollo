import { useState, useEffect, useCallback } from 'react';

function Formulario() {

    // URL del servidor para enviar datos del formulario
    const url = "http://localhost:5000/usuarios";

    // Objeto para almacenar los datos del formulario
    let data = {
        nombre: "",
        apellido: "",
        email: "",
        sexo: "",
        mensaje: "",
        terminos: false
    };

    // CAMPO EMAIL *******************************************
    const [enteredEmail, setEnteredEmail] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [alertaEmail, setAlertaEmail] = useState("");

    // Manejador para actualizar el valor del campo de correo electrónico
    function updateEmailHandler(event) {
        setEnteredEmail(event.target.value)
    }

    // CAMPO NOMBRE *******************************************
    const [enteredNombre, setEnteredNombre] = useState('');
    const [validateNombre, setValidateNombre] = useState(false);
    const [alertaNombre, setAlertaNombre] = useState('');

    // Manejador para actualizar el valor del campo de nombre
    function updateNombreHandler(event) {
        const enteredName = event.target.value
        setEnteredNombre(event.target.value);
    }

    // CAMPO APELLIDOS *******************************************
    const [enteredApellido, setEnteredApellido] = useState('');
    const [validateApellido, setValidateApellido] = useState(false);
    const [alertaApellido, setAlertaApellido] = useState("");

    // Manejador para actualizar el valor del campo de apellidos
    function updateApellidosHandler(event) {
        const enteredApellido = event.target.value
        setEnteredApellido(enteredApellido);
    }

    // CAMPO SEXO *******************************************
    const [enteredSexo, setEnteredSexo] = useState("Sin especificar");
    const [validateSexo, setValidateSexo] = useState(true);

    // Manejador para actualizar el valor del campo de sexo
    function updateSexoHandler(event) {
        setEnteredSexo(event.target.value);
        console.log('sexo ok!');
        setValidateSexo(true);
    }

    // CAMPO MENSAJE *******************************************
    const [enteredMensaje, setEnteredMensaje] = useState('');
    const [validateMensaje, setValidateMensaje] = useState(true);
    const [alertaMensaje, setAlertaMensaje] = useState("");

    // Manejador para actualizar el valor del campo de mensaje
    function updateMensajeHandler(event) {
        setEnteredMensaje(event.target.value);
    }

    // CAMPO TÉRMINOS *******************************************
    const [enteredTerminos, setEnteredTerminos] = useState(false);
    const [validateTerminos, setValidateTerminos] = useState(false);
    const [alertaTerminos, setAlertaTerminos] = useState("");

    // Manejador para actualizar el valor del campo de términos
    function updateTerminosHandler(event) {
        setEnteredTerminos(event.target.checked);
    }

    // Función que valida todos los campos del formulario
    const handleValidateAll = useCallback(() => {
        // TÉRMINOS --------------------------------------------------------------------------------------
        if (enteredTerminos === true) {
            console.log('términos ok!');
            console.log(enteredTerminos);
            setValidateTerminos(true);
            setAlertaTerminos("");
        } else {
            setAlertaTerminos("Debe aceptar los términos y condiciones.")
            setValidateTerminos(false);
            console.log('terminos NO ok!');
        }

        // MENSAJE --------------------------------------------------------------------------------------
        if (enteredMensaje.length <= 500) {
            console.log('mensaje ok!');
            setValidateMensaje(true)
            setAlertaMensaje("");
        } else {
            setAlertaMensaje("El mensaje no puede contener más de 500 caracteres.")
            setValidateMensaje(false);
        }

        // APELLIDOS --------------------------------------------------------------------------------------
        if (enteredApellido.length > 0 && enteredApellido.length <= 20) {
            console.log('apellidos ok!');
            setValidateApellido(true);
            setAlertaApellido("");
        } else if (enteredApellido.length === 0) {
            setAlertaApellido("El apellido no puede estar vacío.")
            setValidateApellido(false);
            console.log('apellidos vacío!');
        } else {
            setAlertaApellido("El apellido no puede contener más de 20 caracteres.")
            setValidateApellido(false);
            console.log('apellidos +20 caracteres!');
        }

        // NOMBRE --------------------------------------------------------------------------------------
        if (enteredNombre.length > 0 && enteredNombre.length <= 10) {
            console.log('nombre ok!');
            setValidateNombre(true);
            setAlertaNombre("");
        } else if (enteredNombre.length > 10) {
            setAlertaNombre("El nombre no puede contener más de 10 caracteres.")
            setValidateNombre(false);
            console.log('nombre +10 caracteres!');
        } else if (enteredNombre.length === 0) {
            setAlertaNombre("El nombre no puede estar vacío.")
            setValidateNombre(false);
            console.log('nombre vacío!');
        }

        // EMAIL --------------------------------------------------------------------------------------
        if (enteredEmail.includes('@') && enteredEmail.length > 0 && enteredEmail.length <= 20) {
            console.log('mail ok!');
            setValidateEmail(true);
            setAlertaEmail("");
        } else if (enteredEmail.length === 0) {
            setAlertaEmail("El email no puede estar vacío.")
            setValidateEmail(false);
            console.log('mail vacío!');
        } else if (enteredEmail.length > 20) {
            setAlertaEmail("El email no puede contener más de 20 caracteres")
            setValidateEmail(false);
            console.log('mail +20 caracteres');
        } else {
            setAlertaEmail("El email debe contener un @.")
            setValidateEmail(false);
            console.log('mail sin @!');
        }
    }, [enteredNombre, enteredApellido, enteredEmail, enteredSexo, enteredMensaje, enteredTerminos])

    // Efecto para ejecutar la validación cada vez que se actualizan los campos del formulario
    useEffect(
        function () {
            handleValidateAll()
        }, [handleValidateAll]
    )

    // Función para la comprobación de los datos y envío del formulario (mostrar mensaje)
    function handleSubmit(e) {
        e.preventDefault();
        if (validateNombre === true && validateApellido === true && validateEmail === true && validateSexo === true && validateMensaje === true && validateTerminos === true) {
            console.log("Formulario enviado correctamente")

            // Actualizar los datos del objeto 'data' con los valores del formulario
            data = {
                nombre: enteredNombre,
                apellido: enteredApellido,
                email: enteredEmail,
                sexo: enteredSexo,
                mensaje: enteredMensaje,
                terminos: enteredTerminos
            };

            // Enviar datos del formulario al servidor
            fetchPost(url, data).then(() => {
                // Limpiar los campos del formulario
                setEnteredNombre('');
                setEnteredApellido('');
                setEnteredEmail('');
                setEnteredSexo('');
                setEnteredMensaje('');
                setEnteredTerminos(true

                );

                // Restablecer los estados de validación
                setValidateNombre(false);
                setValidateApellido(false);
                setValidateEmail(false);
                setValidateSexo(false);
                setValidateMensaje(false);
                setEnteredTerminos(true);

                // Mostrar mensaje de éxito
                alert("FORMULARIO ENVIADO CORRECTAMENTE AL SERVIDOR")

            })
        } else {
            console.log("el formulario no se ha enviado")
            alert("EL FORMULARIO NO SE HA PODIDO ENVIAR")
        }
    }

    // Función para realizar una solicitud POST al servidor
    async function fetchPost(url, data) {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(data), // Convierte JS en JSON
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    // Efecto para realizar una solicitud POST al servidor al cargar el componente
    useEffect(function () {
        fetchPost(url, data)
    }, []);

    return (
        <form onSubmit={handleSubmit} className='form'>

            <div>
                <h1>Formulario de registro</h1>
            </div>

            <div>
                <label>Nombre</label><span>   </span>
                <input value={enteredNombre} type="text" onChange={updateNombreHandler} />
                <p className='error'>{alertaNombre}</p>
            </div>

            <br />

            <div>
                <label>Apellidos</label><span>   </span>
                <input value={enteredApellido} type="text" onChange={updateApellidosHandler} />
                <p className='error'>{alertaApellido}</p>
            </div>

            <br />

            <div>
                <label>Email</label><span>   </span>
                <input value={enteredEmail} type="text" onChange={updateEmailHandler} />
                <p className='error'>{alertaEmail}</p>
            </div>

            <br />

            <div>
                <label>Sexo</label><span>   </span>
                <select className='textarea' type="text" onChange={updateSexoHandler}>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Otro">Otro</option>
                    <option selected value="Sin especificar">Sin especificar</option> {/*TODO no se detecta como seleccionado aparece "" */}
                </select>
            </div>

            <br />

            <div>
                <label>Mensaje</label><span>   </span>
                <textarea value={enteredMensaje} className='textarea' type="text" onChange={updateMensajeHandler} maxLength={500} />
                <p>Caracteres restantes: {500 - enteredMensaje.length}</p>
                <p className='error'>{alertaMensaje}</p>
            </div>

            <br />

            <div>
                <label>Aceptar términos y condiciones</label><span>   </span>
                <input type='checkbox' value={enteredTerminos} name="terminos" onChange={updateTerminosHandler} checked={enteredTerminos} />
                <p className='error'>{alertaTerminos}</p>
            </div>

            <br />

            <button type='submit'>Enviar Formulario</button>
        </form>
    );
}

export default Formulario;
