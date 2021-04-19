
class Comentario {
	constructor (autor, fecha, texto){
		this.autor = autor;
		this.fecha = fecha;
		this.texto = texto;
	}

	toString() {
		var formatoFecha = this.fecha.getDate() + "/" + (this.fecha.getMonth()+1) + "/" + this.fecha.getFullYear() + " " + this.fecha.getHours() + ":" + this.fecha.getMinutes();
		return this.autor + " " + formatoFecha + "</br>" + this.texto;
	}
}

// Vector variable global con comentarios
let listaComentarios = [ /*new Comentario('ahmed', '24/11/200', 'Qué asco de página',*/
  new Comentario ('Roberto García Escobar', new Date(), 'Vaya asco de página, jamás la volveré a usar'),
  new Comentario ('Pablo Antonio José', new Date(), 'Al principio pensé que no me gustaría, y al final también')
];

function showComments(){
	var commentPanel = document.getElementById('comment');
	commentPanel.style.display = "grid";

	var descripcionEvento = document.getElementById("descripcionEvento");
		descripcionEvento.style.gridTemplateAreas  =
			'"header header  header header" "video content content comment" "video horarios horarios comment"';
	descripcionEvento.style.gridTemplateColumns = "30% auto auto 40%";

	cargarComentarios(listaComentarios);

	return false;
}

function cargarComentarios(lista) {
	 console.log("Estamos haciendo la lista");
    for (i = 0; i < lista.length; ++i) loadComment(lista[i]);
}

function enviarComentario(){
	// vamos a envíar un comentario
	// consiste en añadir a la lista de comentarios un nuevo comentario
	// primero: obtener los elementos por su id
	// segundo: extraer de estos los textos
	// tercero: procesar los datos
	// cuarto: crear a partir de datos procesados nuevos comentarios
	// quinto: añadir a la lista los nuevos comentarios

	// 1.- obtener elementos por id
	var nombre = document.getElementById('nombre');
	var email = document.getElementById('email');
	var texto = document.getElementById('textoComentario');

	// 2.- extraer textos de ellos
	var emailValue = email.value;

	// 3.- procesar los datos
	// Para validación de email podemos usar RegExp, una clase existente en javascript
	// dicha clase usa expresiones regulares que se definen en el constructor y evalua mediante
	// el metodo test(str) si la cadena pasada como argumento encaja en la expresion regular descrita
	// asi pues nos hace falta solamente una regexp para validar email.
	// Una RegExp trivial sería: [numeros y letras]@[nombre de dominio].[dominio de primer nivel]
	// Nosotros vamos a usar una regexp ajena, encontrada en internet, algo mas complicada y efectiva

	var validaEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
	if (!validaEmail.test(emailValue)) {
		alert("Email introducido incorrecto, por favor, introduzca uno de nuevo");
		return false;
	}


	if (nombre.value == "" || texto.value == "" ){
		alert("Tienes que rellenar todos los campos");
		return false;
	}


	//4.- crear objetos comentario
	var nuevoComentario = new Comentario (nombre.value, new Date(), texto.value);
	listaComentarios.push(nuevoComentario);

	// 5.- cargar el comentario en pantalla
	loadComment(nuevoComentario);

	// Reseteamos todos los campos de escritura al valor por defecto
	nombre.value = texto.value = email.value = "";

}

function loadComment(newComment){
	var listContainer = document.getElementById('listaComentarios');

	// create an item for each one
	listItem = document.createElement('p');

	listItem.innerHTML = newComment.toString();
	listItem.classList.add("itemComentario");

	// Add listItem to the listElement
	listContainer.appendChild(listItem);
}


var inicioPalabra = 0;
var finalPalabra = 0;

var palabrasCensuradas = ['tonto', 'idiota', 'feo', 'apple', 'ios', 'mierda', 'puta', 'polla', 'gilipollas', 'cago', 'muertos'];

function censura() {
	// Analizaremos las palabras que contenga textoComentario
	// y encontradaCensuraemos las que se encuentren en la lista de censurados
	var textoComentario = document.getElementById('textoComentario');
	var texto = textoComentario.value;

	// Si se ha escrito algo
	if (texto.length > 0) {
		var lastChar = texto.length - 1;															 // irse a la última letra escrita
		var charActual = texto[lastChar];														 // ultimo caracter escrito

		if (charActual == ' ' || charActual == '\t' || charActual == '\n'){			 // si es uno de estos caracteres
			finalPalabra = lastChar;																 // hemos escrito una palabra (palabra es algo entre espacios o caracteres no legibles)
			ultimaPalabra = texto.substr(inicioPalabra, finalPalabra).trim();			 // extremos la palabra

			var encontradaCensura = false;														 // no censuramos hasta que encontremos palabra mala
			for (i = 0; i < palabrasCensuradas.length && !encontradaCensura; i++)	 // buscamos en lista de palabras censuradas
				if (ultimaPalabra == palabrasCensuradas[i]) encontradaCensura = true; // si alguna coincide salimos del bucle

			if (encontradaCensura){																	 // si encontramos palabra censurada
				var asteriscos = "";																	 // creamos cadena de asteriscos
				for (i = 0; i < ultimaPalabra.length; i++) asteriscos += "*";			 // tantos asteriscos como caracteres la palabra censurada

				var textoCensurado = texto.substr(0, inicioPalabra)						 // generamos texto censurado (texto con palabra censurada cambiada por asteriscos)
											+ asteriscos + charActual;
				textoComentario.value = textoCensurado;										// asignamos dicho texto al campo donde se muestra el texto comentario

			}

			inicioPalabra = lastChar + 1;															// inicio sera la siguiente palabra
		}
	} else {																								// Si no hay nada escrito reseteamos las variables
		inicioPalabra = finalPalabra = 0;
	}
}
