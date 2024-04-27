const socket = io();

socket.on('productos', productos => {
    const tbody = document.getElementById('productos-body');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const row = tbody.insertRow();

        row.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.code}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.status ? 'Activo': 'Desactivo'}</td>
        <td>${producto.thumbnails}</td>
        `;
    });
});

const formulario = document.getElementById('producto-form');

formulario.addEventListener('submit', function (event){
    event.preventDefault();

    //obtener valores del form
    const titulo = document.getElementById('titulo').valeu;
    const descripcion = document.getElementById('descripcion').valeu;
    const precio = document.getElementById('precio').valeu;
    const codigo = document.getElementById('codigo').valeu;
    const stock = document.getElementById('stock').valeu;
    const categoria = document.getElementById('categoria').valeu;

    // envia el nuevo producto al servidor a traves del socket
    const producto = {
        title: titulo,
        description: descripcion,
        price: precio,
        code: codigo,
        stock: stock,
        category: categoria
    };

    socket.emit('agregarProducto', producto);
    formulario.requestFullscreen(); //limpial el form despues de enviar

});