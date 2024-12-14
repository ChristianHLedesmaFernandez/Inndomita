// local Storage


function agregarAlCarrito(item){
    //const carrito = JSON.parse(localStorage.getItem("productos"));
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    if(!carrito){
        const nuevoProducto = getNuevoProductoParaMemoria(item);
        //nuevoProducto.cantidad = 1;        
        localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
    } else {
        const indiceProducto = carrito.findIndex(producto => item.id === producto.id);
        console.log(indiceProducto);
        const nuevoCarrito = carrito;
        if (indiceProducto === -1){
            nuevoCarrito.push(getNuevoProductoParaMemoria(item));
        } else {
            nuevoCarrito[indiceProducto].cantidad ++;
        }
        localStorage.setItem("productos", JSON.stringify(nuevoCarrito));
    }
    actualizarNumeroCarrito();
};




// Toma un producto, le agrega cantidad y lo devuelve.
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
};

const cuentaCarritoElement = document.getElementById("cuenta_carrito");

function actualizarNumeroCarrito(){
    const carrito = JSON.parse(localStorage.getItem("productos"));
    const cuenta = carrito.reduce((acum, current) => acum+current.cantidad, 0);

    cuentaCarritoElement.innerHTML = cuenta;

}

actualizarNumeroCarrito();