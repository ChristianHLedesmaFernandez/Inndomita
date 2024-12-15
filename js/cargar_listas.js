// Constante para el IVA
const IVA = 0.21;  // 21% de IVA
// Carga Lista de Productos Seleccionados
function cargarCarrito(){
  carrito = JSON.parse(localStorage.getItem('carritoProductos'));
  const contenedorCarrito = document.getElementById("carrito-container");  
  // Variables para Calcular los Importes
  const subtotalCarrito = document.getElementById('subtotal-carrito');
  const descuentoCarrito = document.getElementById('descuento-carrito');
  const ivaCarrito = document.getElementById('iva-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  // Inicializar Totales
  let subtotal = 0;
  let descuentoTotal = 0;
  //Borrar Lista Anterior
  contenedorCarrito.innerHTML = '';  
  if(carrito){
    // Cargo productos en la lista de Productos 
    carrito.forEach(carrito => {
      let precioItem = 0;
      const nuevoItem = document.createElement("div");
      nuevoItem.classList = "item";
      // Calcular descuento individual
      const descuentoProducto = 0; //productoInfo.descuento * producto.precio;
      //const precioConDescuento = producto.precio - descuentoProducto;      
      precioItem = carrito.precio * carrito.cantidad;
      nuevoItem.innerHTML =`
            <div class="item" id="${carrito.id}">
              <div class="imagen">
                  <img class="img-carrito" src="../img/productos/${carrito.id}.jpg" alt=""> 
              </div>
              <div class="nombre">
              ${carrito.nombre}
              </div>
              <div class="precio">$ ${precioItem}</div>              
              <div class="cantidad">
                  <span class="menos">-</span>
                  <span>${carrito.cantidad}</span>
                  <span class="mas">+</span>
              </div>
            </div>              
      `;
      contenedorCarrito.appendChild(nuevoItem);
      // Sumar al subtotal y descuentos
      subtotal += precioItem;
      descuentoTotal += descuentoProducto;
  });
  } 
  // Calcular Los Importes    
  // Calcular IVA
  const ivaTotal = (subtotal - descuentoTotal) * IVA;
  const total = subtotal - descuentoTotal + ivaTotal;      
  // Actualizar totales
  subtotalCarrito.textContent = subtotal.toFixed(2);
  //descuentoCarrito.textContent = descuentoTotal.toFixed(2);
  ivaCarrito.textContent = ivaTotal.toFixed(2);
  totalCarrito.textContent = total.toFixed(2);
};



