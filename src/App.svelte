<script>
  // @ts-nocheck
 import {Toast} from 'bootstrap'
 $:console.log(toastEl) 

 let opc = {texto:'' , color:''}

 let instancia;
 $:if(toastEl){
  instancia = new Toast(toastEl)
 }

const mostrarToast = (texto , color) => {
  opc = {texto , color}
  instancia.show()
};


  let toastEl;
  let todos = [];
  let todo = { id: "", texto: "", estado: false };

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  $: localStorage.setItem("todos", JSON.stringify(todos));

  const addTodo = () => {
    if (!todo.texto.trim()) {
      console.log("vacio");
      todo.texto = "";
      return;
    }

    // @ts-ignore
    todo.id = Date.now();
    todos = [...todos, todo];
    console.log(todos);
    todo = { id: "", texto: "", estado: false };
    mostrarToast('Se agrego correctamente', 'bg-primary')
  };

  const delTodos = (id) => {
    todos = todos.filter((item) => item.id !== id);
    mostrarToast('Se ha borrado', 'bg-danger')
  };

  const updateTodos = (id) => {
    todos = todos.map((item) =>
      item.id === id ? { ...item, estado: !item.estado } : item
    );
    console.log(todos);
    mostrarToast('Se ha actualizado', 'bg-warning')
  };

  const classEstado = (valor) =>
    valor ? "btn btn-sm btn-success" : "btn btn-sm btn-warning";

  const classIcono = (valor) =>
    valor ? "bi bi-arrow-clockwise" : "bi bi-check2";
</script>

<div class="container">
  <h1 class="my-4">CRUD</h1>
  <form on:submit|preventDefault={addTodo}>
    <input
      type="text"
      placeholder="Enter para agregar"
      class="form-control shadow border-0"
      bind:value={todo.texto}
    />
  </form>
  {#each todos as item}
    <div class="shadow my-3 p-3 lead">
      <p class={item.estado ? "text-decoration-line-through" : ""}>
        {item.texto}
      </p>
      <button class={classEstado(item.estado)} on:click={updateTodos(item.id)}>
        <i class={classIcono(item.estado)} />
      </button>
      <button class="btn btn-sm btn-danger" on:click={delTodos(item.id)}>
        <i class="bi bi-trash" />
      </button>
    </div>
  {/each}
  <div class="toast-container position-absolute p-3 top-0 end-0">
    <div bind:this={toastEl}
      class="toast align-items-center text-white {opc.color} border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">{opc.texto}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
    </div>
  </div>
</div>
