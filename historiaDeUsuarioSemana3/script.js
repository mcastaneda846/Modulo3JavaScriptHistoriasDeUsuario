const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const listaNotas = document.querySelector("#listaNotas"); //Usa querySelector con # porque es un id.

console.log(input);
console.log(addButton);
console.log(listaNotas);

let notas = [];

// Cargar notas desde localStorage
const notasGuardadas = JSON.parse(localStorage.getItem("notas")); //Busca en el navegador si existe algo guardado con la clave "notas" y Convierte el texto JSON en un array de JavaScript.
if (notasGuardadas) {
  notas = notasGuardadas; //Copia las notas guardadas al array en memoria.
  renderizarNotas(); //Dibuja todas las notas en el DOM.
  console.log(`Se cargaron ${notas.length} notas`);
}

function guardarNotas() {
  localStorage.setItem("notas", JSON.stringify(notas)); //Convierte el array en texto JSON. Lo guarda en el navegador para que persista al recargar.
  console.log("Notas guardadas en Local Storage");
}

//Función que se encarga de mostrar las notas en pantalla.
function renderizarNotas() {
  listaNotas.innerHTML = ""; //Limpia la lista antes de volver a dibujarla y evita que se dupliquen elementos.

  notas.forEach((nota, index) => {
    //Recorre el array de notas, nota es el texto e index es la posición (sirve para eliminar).
    const listado = document.createElement("li"); //Crea un nuevo <li>.
    listado.textContent = nota;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";

    deleteButton.addEventListener("click", () => {
      // Elimina el <li> desde la <ul>
      listaNotas.removeChild(listado);

      // Elimina del arreglo
      notas.splice(index, 1);

      // Actualiza Local Storage
      guardarNotas();

      console.log("Se eliminó la nota correctamente");
    });

    listado.appendChild(deleteButton); //Agrega el botón dentro del <li>
    listaNotas.appendChild(listado); //Agrega el <li> completo a la <ul>.
  });
}

addButton.addEventListener("click", () => {
  if (input.value === "") {
    console.log("El campo está vacío");
    return;
  }

  notas.push(input.value); //Agrega el texto del input al array.
  guardarNotas(); //Guarda y actualiza la vista.
  renderizarNotas();

  console.log("La nota se agregó");

  input.value = ""; //Limpia el input
  input.focus(); //Vuelve a enfocar el cursor para seguir escribiendo.
});
