const cuentaCarritoElement = document.getElementById("cuenta_carrito");
var CarritoOfCanvas = document.getElementById('offcanvasRight')
function agregarAlCarrito(item){
    // Verifico el Stock
    let botonItem = document.querySelector(`.boton${item.id}`);
    let sinStock = document.getElementById(`stock${item.id}`);
    // Si no hay Stock Bloqueo el Boton y Pongo un Msj sobre la Imagen
    if (item.stock <= 0) {
        botonItem.classList.add("disabled");
        sinStock.classList.remove('sin_stock_inactivo');
        sinStock.classList.add('sin_stock_activo')
        return;
    }  
    // Reducir Stock
    item.stock --;
    const carrito = JSON.parse(localStorage.getItem('carritoProductos')) || [];
    if(!carrito){
        const nuevoProducto = getNuevoProductoParaMemoria(item);              
        localStorage.setItem("carritoProductos", JSON.stringify([nuevoProducto]));
    } else {
        const indiceProducto = carrito.findIndex(producto => item.id === producto.id);
        const nuevoCarrito = carrito;
        if (indiceProducto === -1){
            nuevoCarrito.push(getNuevoProductoParaMemoria(item));
        } else {
            nuevoCarrito[indiceProducto].cantidad ++;     
        }
        localStorage.setItem("carritoProductos", JSON.stringify(nuevoCarrito));
    }
    actualizarNumeroCarrito();
};
// Crea un producto para agregar al la lista de compras
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto =  {
        id: producto.id,
        nombre: producto.nombre,
        cantidad: 1,
        descuento: producto.descuento,
        precio: producto.precio
    };
    return nuevoProducto;
};
function actualizarNumeroCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carritoProductos"));
    if(carrito){
        const cuenta = carrito.reduce((acum, current) => acum+current.cantidad, 0);
        cuentaCarritoElement.innerHTML = cuenta;
    } else {
        cuentaCarritoElement.innerHTML = 0;
    }
};
actualizarNumeroCarrito();

// Eliminar el carrito
function vaciarCarrito(){
    actualizarNumeroCarrito();
    // Limpiar localStorage
    localStorage.removeItem('carritoProductos');
    cargarCarrito();
    location.reload()
}
// Funciones de Checkout
function mostrarCheckout() {
    alert('Ralizar Pago');
    vaciarCarrito();
    location.reload()
}



CarritoOfCanvas.addEventListener('show.bs.offcanvas', function () {
    cargarCarrito();
  });
  CarritoOfCanvas.addEventListener('hide.bs.offcanvas', function () {
    actualizarNumeroCarrito();
  });