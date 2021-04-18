let listaServicios = [];
let seleccionados= [];
const data = "https://raw.githubusercontent.com/FlacoMaccio/JavaScript/main/data/data.json"
$(document).ready(function () {
  $.getJSON(data, function (datos, estado) {
    listaServicios = datos;
    for (let servicio of datos) {
      $("#contenidoServicios").append(crearComponente(servicio));
    }
  });
});
function crearComponente(servicio) {
  return `<div class="card mb-3">
              <img src="${servicio.imagen}" class="card-img-top" ;>
              <div class="card-body">
                  <h5 class="card-title">${servicio.nombre}</h5>
                  <p class="card-text">${servicio.descripcion}</p>
                  <p class="card-text">$${servicio.precio}</p>
                  <button id=${servicio.id} class="btn btn-primary btn-servicio"
                    onclick="agregarServicio(this.id)">Agregar</button>
              </div>
          </div>
          `;
}
$("#btn-turno").click(function () {
  $.post(
    "https://jsonplaceholder.typicode.com/posts",
    seleccionados,
    notificarTurnoLimpiarCarrtito,
    "json"
  );
});
const carritoServicios = $(".carritoServicios")
const totalCarrito = document.getElementById("totalCarrito")

function notificarTurnoLimpiarCarrtito(data, status, jqxhr) {
    notificar(`Turno reservado con exito. Su numero es: ${data.id}`);
    seleccionados = [];
    actualizarCarrito();
  
}



function agregarServicio (id){
    if (seleccionados.find(function(elemento){return elemento.id == id})){
      return; //si el elemento ya esta seleccionado salgo de la funcion.
    }
    let encontrado = listaServicios.find(function(elemento){return elemento.id == id});
    seleccionados.push(encontrado);
    
    notificar("");
    //Salida para el usuario
    actualizarCarrito();
};

function notificar(texto) {
  document.getElementById("idNotificacion").innerHTML = texto;
}

function actualizarCarrito() {
  carritoServicios.empty();
  let total = 0;
  for (const agregado of seleccionados) {
    total = total + agregado.precio;
    agregarFilaAlcarritoServicios(agregado);
  }
  totalCarrito.innerHTML = `$${total}`;
 }

function quitarServicio(id) {
  let encontrado = seleccionados.find(function(elemento){return elemento.id == id});
    if (encontrado){
      seleccionados.pop(encontrado);
      actualizarCarrito();
  }
}
function agregarFilaAlcarritoServicios(agregado) {
  const filaServicios = document.createElement('div');
  const contenidoFilaServicios = `
          <div class="row shoppingCartItem">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${agregado.nombre}</h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">${agregado.precio}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div
                        class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <h6 class="shopping-cart-quantity shoppingCartItemQuantity" type="number"
                            value="1">
                        <button class="btn btn-danger buttonDelete" id=${agregado.id} onclick="quitarServicio(this.id)" type="button">X</button>
                    </div>
                </div>
            </div>`;
  filaServicios.innerHTML = contenidoFilaServicios;
  carritoServicios.append(filaServicios);
}
