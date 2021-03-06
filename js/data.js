//  SECCIÓN DE DECLARACIÓN DE INFORMACIÓN ESTÁTICA
const listaServicios = [{
    "id": 1,
    "tipo":"Limpieza",
    "imagen": 'imagenes/mantenimiento.jpg',
    "nombre": "Lavado",
    "descripcion":"Lavado profundo, con shapoo de Ph neutro y microfibras.",
    "precio": 1000
  }, {
    "id": 2,
    "tipo":"Correccion de pintura",
    "nombre": "Pulido 1",
    "imagen": "imagenes/matpul.jpg",
    "descripcion":"En este nivel buscamos la eliminacion de marcas superficiales.",
    "precio": 6000
  }, {
    "id": 3,
    "tipo":"Correccion de pintura",
    "nombre": "Pulido 2",
    "imagen": "imagenes/si(1).jpg",
    "descripcion":"En este nivel buscamos la eliminacion de marcas superficiales y de mayor profundidad",
    "precio": 10000
  }, {
    "id": 4,
    "tipo":"Correccion de pintura",
    "nombre": "Pulido 3",
    "imagen": "imagenes/pulido3.jpg",
    "descripcion":"En este nivel buscamos la eliminacion de practicamente el 100% de los defectos.",
    "precio": 15000
  }, {
    "id": 5,
    "tipo":"Tratamiento de porteccion",
    "nombre": "Proteccion Encerado",
    "imagen": "imagenes/encerado.jpg",
    "descripcion":"Mejora el brillo, otorga suaviadad a la pintura, Proteccion por hasta 6 meses",
    "precio": 3000
}, {
    "id": 6,
    "tipo":"Tratamiento de porteccion",
    "nombre": "Proteccion Acrilico",
    "imagen": "imagenes/acrilico.jpg",
    "descripcion":"Mejora el brillo, otorga suaviadad a la pintura, Proteccion por hasta 9 meses",
    "precio": 6000
}, {
    "id": 7,
    "tipo":"Tratamiento de porteccion",
    "nombre": "Proteccion Ceramica",
    "imagen": "imagenes/proteccion.jpg",
    "descripcion":"Proteccion semipermanente, dureza de 9h y duracion de hasta 24 meses.",
    "precio": 10000
}, {
    "id": 8,
    "tipo":"Preparacion para la venta",
    "nombre": "Preventa",
    "imagen": 'imagenes/preventa.jpg',
    "descripcion":"Nos encargamos de preparar tu usado para que luzca mejor al momento de venderlo.",
    "precio": 8000
}, {
    "id": 9,
    "tipo":"Interior",
    "nombre": "Limpieza de interiror",
    "imagen": "imagenes/interior.jpg",
    "descripcion":"Limpiamos y desinfectamos todo el interior de tu vehículo con vapor y químicos que protegen todos los materiales",
    "precio": 5000
}];

let seleccionados= [];
