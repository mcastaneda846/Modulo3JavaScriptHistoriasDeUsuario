import { formularioHTML } from "./src/views/form.js";

// ===============================
// CONTENEDORES PRINCIPALES
// ===============================
const app = document.getElementById("app");
const listaProductos = document.getElementById("listaProductos");
const btnSync = document.getElementById("btnSync");

// ===============================
// ARREGLO GLOBAL (PERSISTENCIA)
// ===============================
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// ===============================
// MOSTRAR FORMULARIO
// ===============================
function mostrarFormulario() {
  app.innerHTML = formularioHTML();

  const form = document.getElementById("formDinamico");
  form.addEventListener("submit", enviarDatos);
}

// ===============================
// CAPTURAR Y VALIDAR DATOS
// ===============================
function enviarDatos(e) {
  e.preventDefault();

  const nombreInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const mensajeError = document.getElementById("mensajeError");

  const nombre = nombreInput.value.trim();
  const precio = Number(priceInput.value);

  mensajeError.textContent = "";
  priceInput.style.border = "1px solid #ccc";

  if (!nombre) {
    mensajeError.textContent = "El nombre no puede estar vacío";
    return;
  }

  if (precio <= 0) {
    mensajeError.textContent = "El precio debe ser mayor a cero";
    priceInput.style.border = "2px solid red";
    return;
  }

  const producto = {
    id: Date.now(),
    nombre,
    precio,
  };

  productos.push(producto);
  guardarEnLocalStorage();
  renderizarProductos();

  e.target.reset();
}

// ===============================
// RENDERIZAR PRODUCTOS EN EL DOM
// ===============================
function renderizarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `Producto: ${producto.nombre} | Precio: $${producto.precio} `;

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar";

    btnDelete.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });

    li.appendChild(btnDelete);
    listaProductos.appendChild(li);
  });
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(id) {
  productos = productos.filter((producto) => producto.id !== id);
  guardarEnLocalStorage();
  renderizarProductos();
}

// ===============================
// LOCAL STORAGE
// ===============================
function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// ===============================
// SINCRONIZAR CON LA API (FETCH)
// ===============================
btnSync.addEventListener("click", async () => {
  try {
    console.clear();
    console.log("Iniciando sincronización con la API...");

    // 1. Estado inicial
    console.log("Productos en Local Storage (antes):", productos);

    // 2. GET a la API
    const response = await fetch("http://localhost:3000/productos");
    if (!response.ok) {
      throw new Error("Error al obtener productos desde la API");
    }

    const productosAPI = await response.json();
    console.log("Productos obtenidos desde la API:", productosAPI);

    // 3. Adaptar formato
    const productosAdaptados = productosAPI.map((p) => ({
      id: p.id,
      nombre: p.name,
      precio: p.price,
    }));

    console.log("Productos adaptados:", productosAdaptados);

    // 4. Fusión sin duplicados
    const mapaProductos = new Map();

    productos.forEach((p) => mapaProductos.set(p.id, p));
    productosAdaptados.forEach((p) => mapaProductos.set(p.id, p));

    productos = Array.from(mapaProductos.values());

    console.log("Productos finales fusionados:", productos);

    // 5. Guardar y renderizar
    guardarEnLocalStorage();
    renderizarProductos();

    console.log("Sincronización completada correctamente");
    console.log(
      "Local Storage actualizado:",
      JSON.parse(localStorage.getItem("productos")),
    );
  } catch (error) {
    console.error("Error en la sincronización:", error);
  }
});

// ===============================
// POST - AGREGAR PRODUCTO A LA API
// ===============================
async function agregarProductoAPI(producto) {
  try {
    console.log("Agregando producto a la API:", producto);

    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: producto.nombre,
        price: producto.precio,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar producto a la API");
    }

    const productoCreado = await response.json();
    console.log("Producto creado en la API:", productoCreado);
    return productoCreado;
  } catch (error) {
    console.error("Error en POST:", error);
    return null;
  }
}

// ===============================
// PUT - ACTUALIZAR PRODUCTO EN LA API
// ===============================
async function actualizarProductoAPI(id, producto) {
  try {
    console.log("Actualizando producto en la API:", id, producto);

    const response = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: producto.nombre,
        price: producto.precio,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar producto en la API");
    }

    const productoActualizado = await response.json();
    console.log("Producto actualizado en la API:", productoActualizado);
    return productoActualizado;
  } catch (error) {
    console.error("Error en PUT:", error);
    return null;
  }
}

// ===============================
// DELETE - ELIMINAR PRODUCTO DE LA API
// ===============================
async function eliminarProductoAPI(id) {
  try {
    console.log("Eliminando producto de la API:", id);

    const response = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar producto de la API");
    }

    console.log("Producto eliminado de la API correctamente");
    return true;
  } catch (error) {
    console.error("Error en DELETE:", error);
    return false;
  }
}

// ===============================
// INICIALIZACIÓN
// ===============================
mostrarFormulario();
renderizarProductos();
