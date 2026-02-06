export function formularioHTML() {
  return `
    <form id="formDinamico" class="formulario">
      <input
        type="text"
        id="name"
        placeholder="Nombre del producto"
        class="input"
        required
      >

      <input
        type="number"
        id="price"
        placeholder="Precio del producto"
        class="input"
        required
      >

      <button type="submit" class="btn">
        Agregar
      </button>

      <div id="mensajeError" class="error"></div>
    </form>
  `;
}
