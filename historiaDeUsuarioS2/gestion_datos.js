// Crear objeto de productos
const productos = {
  producto1: { id: 1, nombre: "Mouse", precio: 45000 },
  producto2: { id: 2, nombre: "Teclado", precio: 80000 },
  producto3: { id: 3, nombre: "Monitor", precio: 900000 },
};

// Función para validar que los productos tengan datos correctos
const validarProducto = (producto) => {
  return (
    typeof producto.id === "number" &&
    producto.id > 0 &&
    typeof producto.nombre === "string" &&
    producto.nombre.trim() !== "" &&
    typeof producto.precio === "number" &&
    producto.precio > 0
  );
};

// Mostrar productos recorriéndolos con for...in
console.log("Productos recorridos con for...in:");
for (let clave in productos) {
  if (validarProducto(productos[clave])) {
    console.log(clave, productos[clave]);
  } else {
    console.log(`${clave} Producto inválido`);
  }
}

// Métodos de objetos
console.log("Object.keys():", Object.keys(productos));
console.log("Object.values():", Object.values(productos));
console.log("Object.entries():", Object.entries(productos));

// Crear un Set con números repetidos
let numbers = new Set([1, 2, 3, 4, 4, 5, 6, 5, 7]);

// Mostrar contenido del Set (sin duplicados)
console.log("Set sin duplicados:", numbers);

// Agregar un nuevo número al Set
numbers.add(10);
console.log("Set después de agregar 10:", numbers);

// Verificar si existe un número
console.log("¿El Set contiene el número 7?", numbers.has(7));

// Eliminar un número del Set
numbers.delete(10);
console.log("Set después de eliminar 10:", numbers);

// Recorrer el Set con for...of
console.log("Recorriendo el Set:");
for (const number of numbers) {
  console.log(number);
}

// Map con categoría del producto y nombre del producto
const producto = new Map([
  ["bebidas", "Coca-Cola"],
  ["snacks", "Papas Margarita"],
  ["lácteos", "Leche Alpina"],
  ["aseo", "Jabón Dove"],
]);

// Recorrer el Map con for...of
console.log("Recorriendo el Map con for...of:");
for (const [clave, valor] of producto) {
  console.log(clave, valor);
}

// Recorrer el Map con forEach
console.log("Recorriendo el Map con forEach:");
producto.forEach((nombre, categoria) => {
  console.log(`Categoría: ${categoria} | Producto: ${nombre}`);
});

console.log("Lista completa de productos:", productos);
console.log("Lista de productos únicos (Set):", numbers);
console.log("Categorías y nombres de productos (Map):", producto);
