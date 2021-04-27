let listaServicios = [];
let seleccionados = [];

//Notificamos en caso de que ya tenga un turno con numero id y servicios seleccionados.
let nombresServiciosSeleccionados = JSON.parse(localStorage.getItem("serviciosAgregados"));
let numeroTurnoReservado = localStorage.getItem("numeroTurno");
if (numeroTurnoReservado != null) {
  notificar(
    `Usted ya posee un turno. Su número ${numeroTurnoReservado}, con los siguientes servicios: ${nombresServiciosSeleccionados}`
  );
}

//Obtenemos los datos del json
const data =
  "https://raw.githubusercontent.com/FlacoMaccio/JavaScript/main/data/data.json";
$(document).ready(function () {
  $.getJSON(data, function (datos, estado) {
    listaServicios = datos;
    for (let servicio of datos) {
      $("#contenidoServicios").append(crearComponente(servicio));
    }
  });
});

//Se crean los componentes "servicios"
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

const carritoServicios = $(".carritoServicios");
const totalCarrito = document.getElementById("totalCarrito");
const btnTurno = document.getElementById("btn-turno");

/*Evento click al boton "Reservar turno"*/
btnTurno.onclick = function () {
   /*Se notifica al usuario que debe seleccionar 
    un servicio para poder reservar turno.*/
  if (totalCarrito.innerText == "$0") {
      notificar("Debe seleccionar un servicio para reservar turno");
  } else {
    /* Se confirma el turno con numero id, se guarda la info en localstorage,
    se vacia el carrito para un nuevo presupuesto*/
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      type: "POST",
      data: JSON.stringify(seleccionados),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: notificarTurnoLimpiarCarrtito,
    });
  }
};

function notificarTurnoLimpiarCarrtito(data, status, jqxhr) {
  notificar(`Turno reservado con éxito. Su número es: ${data.id}`);
  localStorage.setItem("numeroTurno", data.id);
  let nombresServiciosSeleccionados = obtenerNombreServiciosSeleccionados(data);
  localStorage.setItem("serviciosAgregados",JSON.stringify(nombresServiciosSeleccionados));
  seleccionados = [];
  actualizarCarrito();
}

function obtenerNombreServiciosSeleccionados(data) {
  let nombresServiciosSeleccionados = [];
  for (const [key, value] of Object.entries(data)) {
    if (key != "id") {
      nombresServiciosSeleccionados.push(value.nombre);
    }
  }
  return nombresServiciosSeleccionados;
};

function agregarServicio(id) {
  if (
    seleccionados.find(function (elemento) {
      return elemento.id == id;
    })
  ) {
    return;
  }
  let encontrado = listaServicios.find(function (elemento) {
    return elemento.id == id;
  });
  seleccionados.push(encontrado);

  notificar("");
  actualizarCarrito();
}

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
/*Eliminamos servicios del carrito */
function quitarServicio(id) {
  let encontrado = seleccionados.find(function (elemento) {
    return elemento.id == id;
  });
  if (encontrado) {
    seleccionados.pop(encontrado);
    actualizarCarrito();
  }
}
/*Visualizamos los servicios agregados en el carrito */
function agregarFilaAlcarritoServicios(agregado) {
  const filaServicios = document.createElement("div");
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
