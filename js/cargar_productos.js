/*
            div class="card">
            <div class="img">
                  <img class="img" src="../img/productos/1.jpg" alt="">
                </div>
                <div class="intro">
                    <span>Lluvia de Humo</span>
                    <p> Que la armonía y la tranquilidad sean parte de tu hogar.
                    La figura del buda irradia y contagia energía positiva.
                    Ideal para decorar tu hogar o para regalar! </p>
                </div>
                <div class="botones">

                  <button type="button" class="btn btn-info">Info</button>
                  
                  <button type="button" class="btn btn-danger">Comprar</button>

                </div>
            </div>
*/
//Carga dinamica del array de Productos

const contenedorProductos = document.getElementById("card-container");


function cargarProductos(productos){
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "card";
        nuevoProducto.innerHTML = `
                <div class="img">
                  <img class="img" src="../img/productos/${producto.id}.jpg" alt="">
                  
                  <span id="stock${producto.id}" class="sin_stock_inactivo">Producto Agotado!</span> 

                </div>
                <div class="intro">
                    <span>${producto.nombre}</span>
                    <p> ${producto.descripcion} </p>
                </div>
                <div class="botones">                  
                  <button id="agregar" type="button" class="boton${producto.id} btn btn-danger">Comprar</button>
                </div>
        `;
        contenedorProductos.appendChild(nuevoProducto);
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));

        
    });
}

cargarProductos(productos);