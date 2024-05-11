const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msg => {
    data = msg;
}); 

socket.on('messageLogs', msgs => {
    renderizar(msgs);
});

const renderizar = (msgs) =>{
    let messages = '';

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user} : ${message.message}</div>`;
    });
    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
}

swal.fire({
    title: 'Identificate',
    input: 'email',
    text: 'Ingresa tu correo electronico para identificarte',
    inputValidator: (value) => {
        if(!value)
            return 'Necesita ingresar un correo electronico para continuar';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expresion regular para validar que sea un email valido 

        if(!emailRegex.test(value))
                return 'Ingresa un correo electronico valido';

        return null;
    },
    allowOutsideClick: false
}).then(result => {   // captura el resultado
    if(result.isConfirmed) {
        user = result.value;
        renderizar(data)
    }
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value;
            socket.emit('message', {user,message});
            chatBox.value = '';
        }
    }
});

socket.on('nuevo_user', () =>{
    Swal.fire({
        text: 'Nuevo usuario se ha conectado',
        toast: true,
        position:'top-right'
    });
});
