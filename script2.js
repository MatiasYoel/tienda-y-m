
  fetch("./productos.json")
    .then(respuesta => respuesta.json())
    .then(data => {
  
      miPrograma(data)
    })
  
  function miPrograma(productos) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    let carrito = document.getElementById("carrito")
    let arrayCarrito = []
  
    renderizarProductos(productos)
  
    function renderizarProductos(arrayProductos) {
      contenedorProductos.innerHTML = ''
      for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div")
  
        tarjetaProducto.innerHTML = `
        <div class="card contenido-card row text-center img-fluid card-body col-12 parrafo" style="width: 18rem;">
            <h3 class="nombreProducto card-title title-cards">${producto.nombre}</h3>
            <h4 class="card-text">$${producto.precio}</h4>
            <img card-img-top mt-5 src=${producto.imgUrl}>
        </div>
      `
  
        contenedorProductos.append(tarjetaProducto)
      }
  
      let botones = document.getElementsByClassName("botonProducto")
      for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
      }
    }
  
    let input = document.getElementById("input")
    input.addEventListener("input", fnInput)
  
   

    function agregarAlCarrito(e) {
      let productoBuscado = productos.find(producto => producto.id == e.target.id)
      let posicionProducto = arrayCarrito.findIndex(producto => producto.id == e.target.id)
  
      if (posicionProducto != -1) {
        arrayCarrito[posicionProducto] = {
          id: arrayCarrito[posicionProducto].id, nombre: arrayCarrito[posicionProducto].nombre, precio: arrayCarrito[posicionProducto].precio, unidades: arrayCarrito[posicionProducto].unidades + 1, subtotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades + 1)
        }
      } else {
        arrayCarrito.push({
          id: productoBuscado.id, nombre: productoBuscado.nombre, precio: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto Agregado al Carrito',
          showConfirmButton: false,
          timer: 1500
          })
      }
  
      renderizarCarrito()
    }
    
    function renderizarCarrito() {
      carrito.innerHTML = ""
      for (const itemCarrito of arrayCarrito) {
        carrito.innerHTML += `
      <div class="itemCarrito">
      <h4 class="productoCarrito">${itemCarrito.nombre}</h4>
      <h4 class="productoCarrito">${itemCarrito.unidades}</h4>
      <h4 class="productoCarrito">$${itemCarrito.subtotal}</h4>
      </div>
      `
      }
      almacenarStorage()
    }
    function almacenarStorage(){
      localStorage.setItem("renderizarCarrito", JSON.stringify(arrayCarrito))
  }

  }