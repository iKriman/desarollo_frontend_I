let productosGlobales = []; 
let carrito = []; 


const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(valor);
};

const cargarProductos = async () => {
    try {
        const respuesta = await fetch('data/productos.json');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        productosGlobales = datos;

        renderizarProductos(productosGlobales);

    } catch (error) {
        console.error('Ocurrió un error al cargar los productos:', error);
        mostrarMensajeError('Lo sentimos, no pudimos cargar el catálogo de productos en este momento. Por favor, recarga la página.');
    }
};

const renderizarProductos = (listaProductos) => {
    const contenedorProductos = document.getElementById('lista-productos');
    contenedorProductos.innerHTML = '';

    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = '<div class="col-12"><p class="text-center text-muted">No se encontraron productos.</p></div>';
        return;
    }

    listaProductos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-6 mb-4';

        col.innerHTML = `
            <div class="card h-100 shadow-sm card-producto">
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span>
                    <h5 class="card-title fw-bold">${producto.nombre}</h5>
                    <p class="card-text text-muted small">${producto.descripcion}</p>
                    <h4 class="text-primary fw-bold mt-auto">${formatearMoneda(producto.precio)}</h4>
                    <!-- Botón para Evento Click -->
                    <button class="btn btn-primary w-100 mt-3 btn-agregar" data-id="${producto.id}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(col);
    });

    asignarEventosAgregarCarrito();
};

const mostrarMensajeError = (mensaje) => {
    const divError = document.getElementById('mensaje-error');
    divError.className = 'alert alert-danger';
    divError.textContent = mensaje;
    document.getElementById('lista-productos').style.display = 'none';
};

const asignarEventosAgregarCarrito = () => {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            evento.preventDefault(); 

            const idProducto = parseInt(evento.target.getAttribute('data-id'));
            agregarAlCarrito(idProducto);
        });
    });
};


const agregarAlCarrito = (id) => {
    const productoEncontrado = productosGlobales.find(p => p.id === id);
    
    if (productoEncontrado) {
        const existeEnCarrito = carrito.find(item => item.id === id);
        if (existeEnCarrito) {
            existeEnCarrito.cantidad += 1;
        } else {
            carrito.push({
                ...productoEncontrado,
                cantidad: 1
            });
        }

        renderizarCarrito();
    }
};


const renderizarCarrito = () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const mensajeVacio = document.getElementById('carrito-vacio');
    const totalContainer = document.getElementById('total-carrito-container');
    const footerCarrito = document.getElementById('footer-carrito');
    const spanTotal = document.getElementById('total-precio');

    listaCarrito.innerHTML = '';
    let totalPrecio = 0;

    if (carrito.length === 0) {
        mensajeVacio.classList.remove('d-none');
        listaCarrito.classList.add('d-none');
        totalContainer.classList.add('d-none');
        footerCarrito.classList.add('d-none');
    } else {
        mensajeVacio.classList.add('d-none');
        listaCarrito.classList.remove('d-none');
        totalContainer.classList.remove('d-none');
        footerCarrito.classList.remove('d-none');

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center lh-sm';
            
            const subtotal = item.precio * item.cantidad;
            totalPrecio += subtotal;

            li.innerHTML = `
                <div>
                    <h6 class="my-0">${item.nombre}</h6>
                    <small class="text-muted">Cant: ${item.cantidad} x ${formatearMoneda(item.precio)}</small>
                </div>
                <span class="text-muted fw-bold">${formatearMoneda(subtotal)}</span>
            `;
            listaCarrito.appendChild(li);
        });

        spanTotal.textContent = formatearMoneda(totalPrecio);
    }
};


const configurarBuscador = () => {
    const formulario = document.getElementById('formulario-busqueda');
    
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        
        const input = document.getElementById('input-busqueda').value.trim().toLowerCase();

        const productosFiltrados = productosGlobales.filter(producto => 
            producto.nombre.toLowerCase().includes(input) || 
            producto.categoria.toLowerCase().includes(input)
        );

        renderizarProductos(productosFiltrados);
    });
};


const configurarFiltrosCategoria = () => {
    const botonesCategoria = document.querySelectorAll('.categoria-btn');
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            evento.preventDefault();
            const categoria = evento.target.getAttribute('data-categoria');
            
            if (categoria === 'todos') {
                renderizarProductos(productosGlobales);
            } else {
                const filtrados = productosGlobales.filter(p => p.categoria === categoria);
                renderizarProductos(filtrados);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarBuscador();
    configurarFiltrosCategoria();
});