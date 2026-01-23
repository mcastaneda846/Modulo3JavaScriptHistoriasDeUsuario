/*Variables para almacenar los datos de nombre y edad.*/
let nombre = prompt("Ingrese su nombre: ");
let age;
let entrada;

// Validar que la entrada no esté vacía y convertir a número.
while (true) {
  entrada = prompt("Ingrese su edad:");

  // Validación de campo vacío
  if (entrada === "") {
    alert("El campo no puede quedar vacío");
    console.error("Campo edad vacío");
    continue;
  }

  age = Number(entrada);

  // Validar que sea número
  if (!isNaN(age)) {
    break;
  }

  console.error("Entrada inválida: la edad no es un número");
  alert("Error: Por favor, ingresa una edad válida en números.");
}

// Validar usando un rango de edad
while (age < 0 || age > 120) {
  console.error(`Edad fuera de rango: ${age}`);
  alert("Ingresa una edad válida");
  age = Number(prompt("Ingresa nuevamente tu edad"));
}


// Mostrar información validada en consola
console.log(`Nombre del usuario: ${nombre}, Edad: ${age}`);

if (age < 18) {
  alert(
    `Hola ${nombre}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`
  );
} else {
  alert(
    `Hola ${nombre}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`
  );
}
