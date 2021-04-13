$.getJSON("data/data.json", function(datos, estado){
    console.log(estado);
    for (let servicio of datos) {
        $("#contenidoServicios").append(crearComponente (servicio));
    }
})
function crearComponente (servicio){
    return(`
                                    <div class="card mb-3">
                                    <img src="${servicio.imagen}." class="card-img-top" ;>
                                    <div class="card-body">
                                        <h5 class="card-title">${servicio.nombre}</h5>
                                        <p class="card-text">${servicio.descripcion}</p>
                                        <p class="card-text">$${servicio.precio}</p>
                                        <button id=${servicio.id} class="btn btn-primary btn-servicio">Agregar</button>
                                    </div>
                                    </div>
                                    </div>`);
}

$(".btn-servicio").click(function (e){
    let encontrado = listaServicios.find(function(elemento){return elemento.id == e.target.id});
    seleccionados.push(encontrado);
    console.log(seleccionados);
    //Salida para el usuario
    $("#servicio").empty();
    let total = 0
    for (const agregado of seleccionados){
        total = total + agregado.precio;
        $("#servicio").append(`<p>Agregado ${agregado.nombre} Precio $ ${agregado.precio}</p>
                                `);
    }
    $("#servicio").append(`<p>Presupuesto Total: ${total}</p>`);
    $("#servicio").slideDown();
       
});

$("#dropdownMenuButton1").click(function (e){
    $("#servicio").toggle();
});
{/* <button class="btnDelete">Quitar</button> */}