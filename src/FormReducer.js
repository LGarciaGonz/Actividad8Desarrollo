import { useReducer } from 'react';
import classes from './Form.module.css';

// Función reductora para gestionar las actualizaciones de estado basadas en diferentes acciones
const formReducer = (state, action) => {
  
    // Manejando el tipo de acción 'EMAIL'
  if (action.type === 'EMAIL') {
    
    // Actualizando el estado con el correo electrónico ingresado y el estado de validación del correo electrónico
    return {
      ...state,
      enteredEmail: action.value,
      emailIsValid: action.value.includes('@'),
    };
  }
  
  // Manejando el tipo de acción 'PASSWORD'
  if (action.type === 'PASSWORD') {
    
    // Actualizando el estado con la contraseña ingresada y el estado de validación de la contraseña
    return {
      ...state,
      enteredPassword: action.value,
      passwordIsValid: action.value.trim().length > 7,
    };
  }
  
  // Si el tipo de acción no es reconocido, devuelve el estado actual
  return state;
};

// Componente funcional que utiliza el hook useReducer para gestionar el estado del formulario
function FormReducer() {
  
// Inicializando el estado y la función de despacho utilizando formReducer
  const [formState, dispatchForm] = useReducer(formReducer, {
    enteredEmail: '',
    emailIsValid: false,
    enteredPassword: '',
    passwordIsValid: false,
  });

  // Calculando la validez general del formulario basada en la validación del correo electrónico y la contraseña
  const formIsValid = formState.emailIsValid && formState.passwordIsValid;

  // Manejador de eventos para cambios en el correo electrónico
  const changeEmailHandler = (event) => {
    const value = event.target.value;
    
    // Despachando la acción 'EMAIL' para actualizar el estado
    dispatchForm({ type: 'EMAIL', value });
  };

  // Manejador de eventos para cambios en la contraseña
  const changePasswordHandler = (event) => {
    const value = event.target.value;
    
    // Despachando la acción 'PASSWORD' para actualizar el estado
    dispatchForm({ type: 'PASSWORD', value });
  };

  // Manejador de eventos para la presentación del formulario
  const submitFormHandler = (event) => {
    event.preventDefault();

    // Verificar la validez general del formulario.
    if (!formIsValid) {
      alert('¡Entradas de formulario no válidas!');
      return;
    }

    // Imprimir en consola el mensaje y los valores introducidos en el formulario.
    console.log('¡Buen trabajo!');
    console.log(formState.enteredEmail, formState.enteredPassword);
  };

  
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="email">Correo Electrónico</label>
        <input id="email" type="email" onChange={changeEmailHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" onChange={changePasswordHandler} />
      </div>
      <button>Enviar</button>
    </form>
  );
}

export default FormReducer;