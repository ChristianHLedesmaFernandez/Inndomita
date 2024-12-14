
//Carga dinamica del array de Productos Seleccionados

const contenedorProductos = document.getElementById("card-container");


function cargarProductos(productos){
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "card";
        nuevoProducto.innerHTML = `
                <div class="img">
                  <img class="img" src="../img/productos/${producto.id}.jpg" alt="">
 

                </div>
                <div class="intro">
                    <span>${producto.nombre}</span>
                    <p> ${producto.descripcion} </p>
                </div>
                <div class="botones">                  
                  <button id="agregar" type="button" class="btn btn-danger">Comprar</button>
                </div>
        `;
        contenedorProductos.appendChild(nuevoProducto);
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));

        
    });
}

cargarProductos(productos);