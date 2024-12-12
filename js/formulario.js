const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll("#formulario input");
const mensaje = document.querySelector("#mensaje");
const boton =  document.getElementById("boton");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	msj: false
}
const validarMensaje = (e) => {
	if(e.target.value == ""){
		campos.msj = false;
		document.querySelector(`#grupo_mensaje`).classList.add('formulario_grupo_incorrecto');
		document.querySelector(`#grupo_mensaje`).classList.remove('formulario_grupo_correcto');
		document.querySelector(`#grupo_mensaje i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo_mensaje i`).classList.remove('fa-circle-check');		
		document.querySelector(`#grupo_mensaje .formulario_input_error`).classList.add('formulario_input_error_activo');				
	}else {	
		document.querySelector(`#grupo_mensaje`).classList.remove('formulario_grupo_incorrecto');
		document.querySelector(`#grupo_mensaje`).classList.add('formulario_grupo_correcto');		
		document.querySelector(`#grupo_mensaje i`).classList.add('fa-circle-check');		
		document.querySelector(`#grupo_mensaje i`).classList.remove('fa-circle-xmark');		
		document.querySelector(`#grupo_mensaje .formulario_input_error`).classList.remove('formulario_input_error_activo');	
		campos.msj = true;		
	}
	validarError();
};
const validarCampo = (expresion, input, campo) => {	
	if(expresion.test(input.value)){				
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_correcto');		
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-check');		
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');		
		document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error_activo');		
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-check');		
		document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');		
		campos[campo] = false;
	}
		validarError();
};
const validarFormulario = (e) => {
	switch(e.target.name){
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
};
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);	
});
mensaje.addEventListener(('keyup'), validarMensaje);
mensaje.addEventListener(('blur'), validarMensaje);

/* Habilitar y desabilitar boton */
function habilitarBoton(){
	boton.classList.remove("opacity-50");
	boton.disabled = false;
};
function deshabilitarBoton(){
	boton.classList.add("opacity-50");
	boton.disabled = true;
};
function validarError() {
	if(campos.nombre && campos.correo && campos.telefono && campos.msj){
		habilitarBoton()
		return true;
	} else {
		console.log("Error en el Formulario"); /*Mensaje por consola*/
		deshabilitarBoton();
		return false;
	}
};
/* Enviar el Formulario por AJAX */
async function handleSubmit(e) {
	e.preventDefault();
	var data = new FormData(e.target);
	fetch(e.target.action, {
	  method: this.method,
	  body: data,
	  headers: {
		  'Accept': 'application/json'
	  }	  
	}).then(response => {
        if (response.ok) {			
			console.log("Se envio el Formulario"); /*Mensaje por consola*/
			/* Activar el Spinner */
			document.getElementById('spinner').classList.remove("spinner_inactivo");
        	formulario.reset();		  
			deshabilitarBoton();
			document.getElementById('formulario_exitoso').classList.add('formulario_exitoso_activo');
			setTimeout(() => {

					document.getElementById('spinner').classList.add("spinner_inactivo");
					
					document.getElementById('formulario_exitoso').classList.remove('formulario_exitoso_activo');
					
					}, 5000);

					document.querySelectorAll('.formulario_grupo_correcto').forEach((icono) => {
					icono.classList.remove('formulario_grupo_correcto');

					});
					
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
            } else {
				document.getElementById('formulario_mensaje_error').classList.add('formulario_mensaje_error_activo');
            }
          })
        }
      }).catch(error => {
        alert("Oops! Hubo un problema al enviar su formulario");
      })

}
formulario.addEventListener("submit", handleSubmit);


