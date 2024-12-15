const cuentaCarritoElement = document.getElementById("cuenta_carrito");
function agregarAlCarrito(item){
    // Verifico el Stock
    let botonItem = document.querySelector(`.boton${item.id}`);
    let sinStock = document.getElementById(`stock${item.id}`);
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
// Toma un producto, le agrega cantidad y lo devuelve.
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto =  {
        id: producto.id,
        nombre: producto.nombre,
        cantidad: 1,
        precio: producto.precio
    };
    return nuevoProducto;
};
function actualizarNumeroCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carritoProductos"));
    const cuenta = carrito.reduce((acum, current) => acum+current.cantidad, 0);
    cuentaCarritoElement.innerHTML = cuenta;
};

actualizarNumeroCarrito();

