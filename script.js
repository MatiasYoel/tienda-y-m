let maquinas= [
    {
        id: 1,
        nombre: "Cree Led C6 Mini H4",
        precio: 3200,
        img: "./assets/img/creeled-c6mini.jpg",
        stock: "En Stock"
    },
    {
        id: 2,
        nombre: "Cree Led C6 Mini H7",
        precio: 3200,
        img: "./assets/img/creeled-c6mini.jpg",
        stock: "En Stock"
    },
    {
        id: 3,
        nombre: "Paño Microfibra Limpieza 40x40",
        precio: 500,
        img: "./assets/img/pañomicrofibra40x40.jpg",
        stock: "En Stock"
    },
    {
        id: 4,
        nombre: "Cuchillo Tramontina 8'",
        precio: 1100,
        img: "./assets/img/cuchillotramontina8.jpg",
        stock: "En Stock"
    },
    {
        id: 5,
        nombre: "Cubre Volante y Cinturon",
        precio: 2450,
        img: "./assets/img/cubrevolanteycinturon.jpg",
        stock: "En Stock"
    },
    {
        id: 6,
        nombre: "Soldador Estaño",
        precio: 1150,
        img: "./assets/img/soldadordeestaño.jpg",
        stock: "En Stock"
    },
    {
        id: 7,
        nombre: "Guantes Invierno Nene/a",
        precio: 700,
        img: "./assets/img/guantesniños.jpg",
        stock: "En Stock"
    },
    {
        id: 8,
        nombre: "Soporte Tv Movible 14 a 55' ",
        precio: 6000,
        img: "./assets/img/soportemovil.jpg",
        stock: "Por Encargue"
    },
    {
        id: 9,
        nombre: "Patillera Recargable",
        precio: 3600,
        img: "./assets/img/patillerat9.jpg",
        stock: "Por Encargue"
    },
    {
        id: 9,
        nombre: "Guantes FOX Bici/Moto",
        precio: 1900,
        img: "./assets/img/guantesfox.jpg",
        stock: "Por Encargue"
    },
    {
        id: 10,
        nombre: "Guantes Polar Sport",
        precio: 1300,
        img: "./assets/img/gau.jpg",
        stock: "Por Encargue"
    },
    {
        id: 11,
        nombre: "Cree Led S6 HD H4",
        precio: 4500,
        img: "./assets/img/creeled-s6hd.jpg",
        stock: "En Stock"
    },
]

let carrito=[]

const contenedor = document.querySelector('#contenedor')
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')

document.addEventListener('DOMContentLoaded', () =>{
    carrito= JSON.parse(localStorage.getItem('carrito')) || []
    productoEnCarrito()
})

maquinas.forEach((producto) =>{
    const {id, nombre, precio, descripcion, stock, img} = producto
    contenedor.innerHTML += `
    <div class="card contenido-card row text-center img-fluid articulo" style="width: 18rem;">
        <img src=${img} class="card-img-top mt-5 " alt="...">
        <div class="card-body col-12 parrafo ">
            <h5 class="card-title title-cards">${nombre}</h5>
            <h5 class="card-text">Precio: $${precio}</h5>
            
            <p  class="card-stock">${stock}</p>
        </div>
        <div>

        </div>
    </div>
    `   
}
)

vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    productoEnCarrito()
})


document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
        if (e.key ==="Escape")e.target.value = ""
        document.querySelectorAll(".articulo").forEach(buscado =>{
            buscado.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?buscado.classList.remove("filtro"):buscado.classList.add("filtro")
        })
    }
})

function agregarProducto(id) {
    let controlStock = maquinas.find(el => el.id === id)
    const productoExistente= carrito.some(producto => producto.id === id)
    if (controlStock.stock>0 ) {
        if (productoExistente) {
            const producto = carrito.map(producto =>{
                if (producto.id === id) {
                    producto.cantidad++ 
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto Agregado al Carrito',
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
            )
            
        }else{
            const item = maquinas.find((producto) => producto.id === id)
            carrito.push(item)        
            Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Agregado al Carrito',
        showConfirmButton: false,
        timer: 1500
        })
    
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Producto sin Stock',
            text: '¡Reingresara Pronto!',
        })
    }
    
    productoEnCarrito()
}

const productoEnCarrito = () => {
    const modalBody = document.querySelector('.modal .modal-body')

    modalBody.innerHTML = ''
    carrito.forEach((producto) =>{
        const {id, nombre, precio, descripcion, stock, img,cantidad } = producto
        modalBody.innerHTML += `
        <div class="modal-contenedor producto">
            <div>
                <img class="img-fluid img-carrito" src="${img}"
            </div>
            <p>Producto: ${nombre}</p>
            <p>Precio: $${precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar Producto</button>
        </div>
        `
    }
    )
    if (carrito.length === 0){
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">¡Tu carrito esta vacio!</p>
        `
    }
    carritoContenedor.textContent = carrito.length
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
    almacenarStorage()
}

function eliminarProducto(id){
    const insumoId = id
    carrito = carrito.filter((insumo) => insumo.id !== insumoId)
    productoEnCarrito()
}

function almacenarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}