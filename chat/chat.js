document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    var chatBox = document.getElementById('chat-box');
    var userInput = document.getElementById('user-input');
    appendMessage('EVA', 'Inicia una conversación con EVA');
    const API_KEY = "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";

    async function getCompletion(messages) {
        const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 300, // Ajusta este valor según lo que consideres apropiado
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content; // Obtener el texto de la respuesta
    }

    // Función para enviar mensajes del usuario al chat
    async function sendMessage() {
        var userMessage = userInput.value;
        appendMessage('Usuario', userMessage);

        if (!userMessage) {
            return;
        }

        // Definir los mensajes del sistema y del usuario
        var messages = [
            {
                "role": "system",
                "content": "You are a compassionate, charismatic, and empathetic artificial intelligence assistant for mental health named Eva, providing services for a mental health association called DREXER. Your task is to be a support for the user, offering advice. In the event that the user is in danger of harming themselves, recommend the professionals at DREXER."
            },
            {
                "role": "user",
                "content": userMessage
            }
        ];

        // Llamar a la función de OpenAI para obtener la respuesta del modelo
        var botResponse = await getCompletion(messages);

        appendMessage('EVA', botResponse);
        userInput.value = '';
    }

    // Función para agregar mensajes al cuadro de chat
    function appendMessage(sender, message) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        var messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'Usuario' ? 'user-message' : 'bot-message');

        var bubbleElement = document.createElement('div');
        bubbleElement.classList.add('message-bubble', sender === 'Usuario' ? 'user-bubble' : 'bot-bubble');

        bubbleElement.innerHTML = message;
        messageElement.appendChild(bubbleElement);
        messageContainer.appendChild(messageElement);

        chatBox.appendChild(messageContainer);
        // Hacer scroll hacia abajo para mostrar el último mensaje
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Asociar la función sendMessage al evento clic del botón de enviar
    document.querySelector('button').addEventListener('click', sendMessage);

    // Permitir enviar mensajes presionando la tecla Enter
    userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});