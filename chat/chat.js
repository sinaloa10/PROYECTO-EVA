document.getElementById('btn_enviar').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (!message) {
        return; // No envía el mensaje si el campo está vacío
    }

    // Agregar el mensaje del usuario al chat
    addMessageToChat(message, 'user-bubble');

    try {
        // Enviar la solicitud POST al servidor con el mensaje del usuario
        const response = await fetch('http://3.93.234.31:3000/respuesta-eva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto: message }), // Enviar el mensaje como JSON
        });

        if (response.ok) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = '';

            // Leer el stream completo y acumular la respuesta
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                botMessage += decoder.decode(value, { stream: true });
            }

            // Ahora que el mensaje está completo, agregarlo al chat
            addMessageToChat(botMessage, 'bot-bubble');
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error enviando el mensaje:', error);
    }

    // Limpiar el input del usuario después de enviar el mensaje
    userInput.value = '';
}

function addMessageToChat(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add(className, 'bubble-container');
    messageBubble.textContent = message;
    chatBox.appendChild(messageBubble);
    chatBox.scrollTop = chatBox.scrollHeight; // Desplaza el chat hacia abajo
}
