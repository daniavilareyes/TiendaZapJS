
class Articulo {
    constructor(id, modelo, color, precio, cantidad, img) {
        this.id = id;
        this.modelo = modelo;
        this.color = color;
        this.precio = precio;
        this.cantidad = cantidad;
        this.img = img;
    }

}

const nikeairmax= ( new Articulo ("2", "Nike Air Max", "Multicolor", "26000", "1", "img/Nike1.jpg" ));
const nikejordan= ( new Articulo ("3", "Nike Jordan", "Negro", "20000", "1", "img/Nike2.jpg" ));
const Vans= ( new Articulo ("1", "Vans", "Negro", "10000", "1", "img/Vans.jpg" ));
const Converse= ( new Articulo ("4", "Converse", "Blanco", "15000", "1", "img/Converse.jpg" ));
const Nikecourt= ( new Articulo ("5", "Nike Court", "Blanco", "19000", "1", "img/Nike3.jpg" ));
const Nikerun= ( new Articulo ("6", "Nike run", "Negro", "19000", "1", "img/Nike4.jpg" ));
const productos = [nikeairmax, nikejordan, Vans, Converse, Nikecourt, Nikerun];


class usuario {
    constructor(nombre, apellido, ciudad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
    }
}
let zapatos = [];
let datosUsuario = [];
let usuariosLocal = [];
almacenados = [];

/*fetch("/datos.json")
    .then((respuesta) => respuesta.json())
    .then((info) => {
        zapatos = info;
        zapatos.forEach((Articulo) => {
            nuevaCards(Articulo);
        });
    })
*/
///// Funcion que crea las card del Stock existente
function iniciar() {
    productos.forEach((Articulo) => {
        nuevaCards(Articulo);

    });
}
iniciar()
///Creo una funcion de Agregar al carrito 
function AgregarCarrito(e) {
    e.target.setAttribute("disabled", true);
    e.target.innerHTML = "Agregado";
    let productoClickeado = zapatos.find((item) => item.id == e.target.id);
    almacenados.push(productoClickeado);
    const guardarLocal = (clave, valor) => {
        localStorage.setItem(clave, valor)
    };
    guardarLocal("listaProductos", JSON.stringify(almacenados));
    const deLocal = JSON.parse(localStorage.getItem("listaProductos"));
    actualizarTabla();
}

///Agrego las cards con los productos
function nuevaCards(Articulo) {
    const rowcard = document.getElementById("rowcard");
    let cards = document.createElement("div");
    cards.innerHTML = ` 
    <img src= ${Articulo.img} class="card-img-top border" alt="...">
    <h5 class="card-title">${Articulo.modelo}</h5>
    <div class="card-body text-center" style="width: 18rem;">
      <p class="card-text">$ ${Articulo.precio}</p>
      <button id="${Articulo.id}" class="btn btn-1 boton">Añadir al carrito </button>
    </div>`;
    rowcard.append(cards)
    rowcard.classList.add("row");
    cards.classList.add("card", "col", "col-sm-8", "col-md-6", "col-lg-4");

    //Agrego el evento click añadir a carrito
    const btn = document.querySelectorAll(".boton");
    for (const boton of btn) {
        boton.addEventListener("click", AgregarCarrito);
    }
}



//////////Barra de busqueda///////
let botonBusqueda = document.querySelector(".botonBusqueda");
botonBusqueda.addEventListener("click", function(e) {
    e.preventDefault();
    const barraBusqueda = document.querySelector(".barraBusqueda").value;
    console.log(barraBusqueda);
    let resultadoBusqueda = zapatos.filter((articulo) => articulo.modelo.toLowerCase().includes(barraBusqueda));
    const rowcard = document.getElementById("rowcard");
    rowcard.innerHTML = "";
    for (const articulo of resultadoBusqueda) {
        nuevaCards(articulo);
    }
    console.log(resultadoBusqueda);
});
////Ordenar cards

botonOrdenar = document.querySelector(".ordenar");
botonOrdenar.onclick = () => {
    zapatos.sort((actual, siguiente) => actual.precio - siguiente.precio);
    rowcard.innerHTML = "";
    zapatos.forEach((Articulo) => {
        nuevaCards(Articulo);
    });
}



//////////////Tabla////////////////
let totalProductos = document.getElementById("Totalproducto")
let totalPrecio = document.getElementById("Totalprecio")
let tabla = document.getElementById("tablabody");
/////
function agregarDatos(Articulo) {
    /// crear row de articulos
    let row = document.createElement("tr");
    row.innerHTML = `<th>${Articulo.id}</th><th>${Articulo.modelo}</th><th>${Articulo.color}</th><th>${Articulo.precio}</th><th><button class="eliminar-item btn btn-danger" id="#${Articulo.id}"></button></th>`;
    tabla.append(row);

    /// splice y  boton eliminar
    locationItem = almacenados.indexOf(Articulo);
    let eliminarItem = document.querySelector(".eliminar-item")
    eliminarItem.className = "btn btn-danger";
    eliminarItem.innerText = "Eliminar";
    eliminarItem.onclick = () => {
        almacenados.splice(locationItem, 1);
        rehabilitarBotonesyLocal();
        actualizarTabla();
    };
    //// foot de tabla 
    totalProductos.innerHTML = almacenados.length;
    totalPrecio.innerHTML = almacenados.reduce((total, Articulo) => total + Articulo.precio * Articulo.cantidad - descuentoEnvios, 0);

}
function rehabilitarBotonesyLocal() {
    const deLocal = JSON.parse(localStorage.getItem("listaProductos"));
    let productoEliminado = deLocal.find(() => Articulo.id === Articulo.id);
    let productoId = productoEliminado.id;
    let btnProducto = document.getElementById(productoId);
    document.getElementById(productoId).innerHTML = "Agregar al carrito";
    btnProducto.disabled = false;
    let indiceProducto = deLocal.indexOf(productoEliminado);
    deLocal.splice(indiceProducto, 1);
    localStorage.setItem("listaProductos", JSON.stringify(deLocal));
}


function actualizarTabla() {
    tabla.innerHTML = "";
    almacenados.forEach((item) => {
        agregarDatos(item);
    });
    totalPrecio.innerHTML = almacenados.reduce((total, Articulo) => total + Articulo.precio * Articulo.cantidad - descuentoEnvios, 0);
    totalProductos.innerHTML = almacenados.length;
}

///Uso de operadores avanzados (operador logico OR)
let deLocal = JSON.parse(localStorage.getItem("listaProductos"));
almacenados = JSON.parse(localStorage.getItem("listaProductos")) || [];

////Menu lateral
const openBtn = document.querySelector("nav > div > i");
const sideBarWrapper = document.querySelector("div.side-bar-wrapper");

openBtn.addEventListener("click", function() {
    sideBarWrapper.style.width = "100vw";
    document.querySelector("#side-bar").style.width = "550px";
});

const closeBtn = document.querySelector("#close-cart");

closeBtn.addEventListener("click", function() {
    sideBarWrapper.style.width = "0vw";
    document.querySelector("#side-bar").style.width = "0px";
});

sideBarWrapper.addEventListener("click", function(e) {
    sideBarWrapper.style.width = "0vw";
    document.querySelector("#side-bar").style.width = "0px";
});
document.querySelector("#side-bar").addEventListener("click", function(e) {
    e.stopPropagation();
});
///// FORMULARIO Y DATOS USUARIOS

usuariosLocal = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
let descuentoEnvios = 900;
const formDatos = document.getElementById("formDatos");
let tablaDatos = document.getElementById("tablaDatos");

function agregarDatosUsuario(usuario) {
    let row = document.createElement("tr")
    row.innerHTML = `<th>  Usuario: ${usuario.nombre} registrado </th><th>Descuento por Envios : $ ${descuentoEnvios} ars </th>`;
    tablaDatos.append(row);
}

function cargarDatosUsuario(e) {
    const input = e.target;
    const nombre = input[0].value;
    const apellido = input[1].value;
    const ciudad = input[2].value;
    return new usuario(nombre, apellido, ciudad);

}

formDatos.addEventListener("submit", (e) => {
    e.preventDefault();
    const pushearUser = cargarDatosUsuario(e);
    datosUsuario.push(pushearUser);
    ////////
    agregarDatosUsuario(pushearUser);
    localStorage.setItem("listaUsuarios", JSON.stringify(datosUsuario));
    let btnUsuario = document.querySelector(".btnusuario");
    btnUsuario.disabled = true;
});

function actualizarUser() {
    let usuariosLocal = JSON.parse(localStorage.getItem("listaUsuarios"));
    let usuarioEliminado = usuariosLocal.find(() => usuario.nombre === usuario.nombre);
    let indiceProducto = usuariosLocal.indexOf(usuarioEliminado);
    usuariosLocal.splice(indiceProducto, 1);
    localStorage.setItem("listaUsuarios", JSON.stringify(usuariosLocal));
    let btnUsuario = document.querySelector(".btnusuario");
    btnUsuario.disabled = false;
}


function actualizarTablaUser() {
    tablaDatos.innerHTML = "";
    usuariosLocal.forEach((item) => {
        agregarDatosUsuario(item)
    });

}

/// eliminar usuario

let eliminarUsuario = document.querySelector(".deleteUser");
eliminarUsuario.onclick = () => {
    actualizarUser()
    actualizarTablaUser()
    tabla.innerHTML = "";
    usuariosLocal = [];
    actualizarTabla()
};
///Comprar
let comprar = document.querySelector(".botoncompra");
comprar.onclick = () => {
    localStorage.clear();
    tabla.innerHTML = "";
    totalPrecio.innerHTML = "";
    totalProductos.innerHTML = "";
    let btn = document.querySelectorAll(".boton");
    for (const boton of btn) {
        boton.disabled = false;
        boton.innerText = "Añadir a carrito";
    }
     /////Sweet Alert////
        Swal.fire({
            title: '¡Felicidades por tu buen gusto! Compra realizada',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
    
}

actualizarTablaUser()
actualizarTabla();