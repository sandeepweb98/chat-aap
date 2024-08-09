const socket = io()
let name;
let textareaa = document.querySelector('#textarea')
let message = document.querySelector('.message_area')
do {
    name = prompt('Enter your name:')
} while(!name)

    textareaa.addEventListener('keyup',(e) => {
        if(e.key === 'Enter'){
            sendMessage(e.target.value)
        }
    })

    function sendMessage(message){
        let msg ={
            user:name,
            message:message.trim()
        }
        appendMessage(msg,'outgoing')

        textareaa.value = ''

        // scrollToBottom()

        socket.emit('message',msg)
    }

    function appendMessage(msg,type){
        let mainDiv = document.createElement('div')
        let className = type

        mainDiv.classList.add(className, 'message')
        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `

        mainDiv.innerHTML = markup
        message.appendChild(mainDiv)
    }

    socket.on('message', (msg) =>{
        appendMessage(msg, 'incoming')
        // scrollToBottom()
    })

    // function scrollToBottom() {
    //     messagearea.scrollTop = messagearea.scrollHeight
    // }