class Adicional {
  constructor(nombre, precio, img, id) {
    this.nombre = nombre;
    this.precio = Number(precio);
    this.img = img;
    this.id = Number(id);
  }
}

const adicionales = []

adicionales.push(new Adicional("Precio del Salon Fines de Semana", "45000", "parque1", "1"))
adicionales.push(new Adicional("Precio del Salon de L a V al Mediodía", "36000", "multiple", "2"))
adicionales.push(new Adicional("Precio del Salon de L a V por la Tarde o Noche", "40500", "interiorV", "3"))
adicionales.push(new Adicional("Maquina de Helados", "12000", "helados", "4"))
adicionales.push(new Adicional("Cabina de Fotos", "9500", "fotocabina", "5"))
adicionales.push(new Adicional("Show de Magia", "6500", "animacion", "6"))
adicionales.push(new Adicional("Show de Burbujas", "3500", "burbujaR", "7"))
adicionales.push(new Adicional("Tatuajes", "4500", "tatuajes", "8"))
adicionales.push(new Adicional("Personajes", "10000", "personaje", "9"))

mostrarProductos();

function mostrarProductos() {
  let productos = document.getElementById("productos");
  for (let item of adicionales) {
    productos.innerHTML +=
      `<div class="card bg-success bg-opacity-75 text-center titulosh2C" style="width: 18rem">
            <img src=../images/${item.img}.jpg class=" w-100 img-fluid" alt="...">
                <div class="card-body">
                <h2 class="card-title">${item.nombre}</h2>
                <h3 class="card-text">$${item.precio}</h3>
                    <a id="btn ${item.id}" href="#" class="btn titulobtn btn-warning" onclick= "agregarAlPresupuesto(${item.id});return false;">Agregar</a>
                </div>
                </div>`
  }
}

let carrito = JSON.parse(localStorage.getItem('carritoPresupueto')) || [];

function agregarAlPresupuesto(codigo) {

  const prod = adicionales.find(p => p.id === codigo);

  const prodAlCarrito = {
    nombre: prod.nombre,
    precio: prod.precio,
    img: prod.img,
    id: prod.id,
  };

  existe = carrito.some((prod) => prod.id == codigo);

  if (existe) {

    Swal.fire({
      title: 'Ya agregaste éste producto a tú presupuesto',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

  } else {
    carrito.push(prodAlCarrito);
  }

  localStorage.setItem("carritoPresupuesto", JSON.stringify(carrito));
}

function presupuestoFinal() {

  let carritoPresupuesto = JSON.parse(localStorage.getItem("carritoPresupuesto"));

  const presupuestoTotal = carritoPresupuesto.reduce((acc, item) => acc + item.precio, 0);
 
  let adicionalesIncluidos = carritoPresupuesto.map((prod) => prod.nombre);

  Swal.fire({
    title: ` Tu presupuesto incluye \n ${adicionalesIncluidos.join("\n")} \n y el total a pagar es $${presupuestoTotal}`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
  carrito = [];

  localStorage.clear();
}

