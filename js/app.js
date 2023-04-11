class Adicional {
  constructor(nombre, precio, img, id) {
    this.nombre = nombre;
    this.precio = Number(precio);
    this.img = img;
    this.id = Number(id);
  }
}

const adicionales = []

adicionales.push(new Adicional("Salon Fines de Semana", "45000", "parque1", "1"))
adicionales.push(new Adicional("Salon de L a V al Mediodía", "36000", "multiple", "2"))
adicionales.push(new Adicional("Salon de L a V por la Tarde o Noche", "40500", "interiorV", "3"))
adicionales.push(new Adicional("Maquina de Helados", "12000", "helados", "4"))
adicionales.push(new Adicional("Cabina de Fotos", "9500", "fotocabina", "5"))
adicionales.push(new Adicional("Show de Magia", "6500", "animacion", "6"))
adicionales.push(new Adicional("Show de Burbujas", "3500", "burbujaR", "7"))
adicionales.push(new Adicional("Tatuajes", "4500", "tatuajes", "8"))
adicionales.push(new Adicional("Personajes", "10000", "personaje", "9"))

let carrito = JSON.parse(localStorage.getItem("carritoPresupuesto")) || [];

mostrarProductos();

function mostrarProductos() {
  let productos = document.getElementById("productos");
    productos.innerHTML = "";

  for (let item of adicionales) {
    let botonTexto = "Agregar";
    let botonClass = "btn titulobtn btn-warning";
    if (carrito.some((prod) => prod.id === item.id)) {
      botonTexto = "QUITAR";
      botonClass = "btn titulobtn btn-secondary";
    }

    productos.innerHTML +=
      `<div class="card bg-success bg-opacity-75 text-center titulosh2C" style="width: 18rem">
            <img src=../images/${item.img}.jpg class=" w-100 img-fluid" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                <h2 class="card-title">${item.nombre}</h2>
                <h3 class="card-text">$${item.precio}</h3>
                    <a id="btn${item.id}" href="#" class="${botonClass}" onclick= "agregarAlPresupuesto(${item.id});return false;">${botonTexto}</a>
                </div>
                </div>`;
  }
  
}


function agregarAlPresupuesto(codigo) {

  const prod = adicionales.find(prod => prod.id === codigo);

  const prodAlCarrito = {
    nombre: prod.nombre,
    precio: prod.precio,
    img: prod.img,
    id: prod.id,
  };

  existe = carrito.some((prod) => prod.id === codigo);

  if (existe) {

    const index = carrito.findIndex(p => p.id === codigo);

    if (index !== -1) {
      carrito.splice(index, 1);
      let boton = "btn" + codigo;
      const botonid = document.getElementById(boton);
      botonid.innerText = "Agregar";

      Swal.fire({
        title: `Quitamos de tu presupuesto <br> ${prodAlCarrito.nombre}`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      });
    }

  } else {
    carrito.push(prodAlCarrito);
    let boton = "btn" + codigo;
    const botonid = document.getElementById(boton);
    botonid.innerText = "QUITAR";

    Swal.fire({
      title: `Se agrego <br> ${prodAlCarrito.nombre} <br> correctamente`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    });
  }
 mostrarProductos();
  localStorage.setItem("carritoPresupuesto", JSON.stringify(carrito));
}

function presupuestoFinal() {

  let carritoPresupuesto = JSON.parse(localStorage.getItem("carritoPresupuesto"));

  const presupuestoTotal = carritoPresupuesto.reduce((acc, item) => acc + item.precio, 0);

  let adicionalesIncluidos = carritoPresupuesto.map((prod) => prod.nombre);

  Swal.fire({
    title: ` Tu presupuesto incluye <br> ${adicionalesIncluidos.join("\n")} <br> y el total a pagar es $${presupuestoTotal}`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
  });

  carrito = [];
  mostrarProductos();
  localStorage.clear();
}

