const socket = io ()

let input_chat_text = document.getElementById('input_chat_text')
let button_send = document.getElementById('button_send')

let user_name

get_userName = async () => {

    // Obtengo el nombre de usuario
    user_name = await Swal.fire({
        title: "Ingrese su nombre de usuario:",
        input: "text",
        showCancelButton: false,
        confirmButtonText: "A chatear!",
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
    
    user_name = user_name.value
}

enviar_mensaje = () => {

    socket.emit ('chat_message', {
        message: input_chat_text.value, 
        user_name: user_name}
    )

    input_chat_text.value = ''
}

button_send.addEventListener('click', () => {
    enviar_mensaje ()
})

input_chat_text.addEventListener('keypress', (button) => {
    button.key == 'Enter' && enviar_mensaje()
})

get_userName()

socket.on('chat_text', (messages_array) => {

    // Limpio el espacio de chat
    let chat_box = document.getElementById('chat_box')
    chat_box.innerText = ''
    
    messages_array.forEach((message) => {
        chat_box.innerHTML += `<p>${message.user_name}:</p`
        chat_box.innerHTML += `<p>${message.message}</p>`
    })
})


