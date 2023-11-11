document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    var chatBox = document.getElementById('chat-box');
    var userInput = document.getElementById('user-input');

    const API_KEY = "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";

    async function getCompletion(prompt) {
        const response = await fetch(`https://api.openai.com/v1/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 200,
            }),
        });

        const data = await response.json();
        return data.choices[0].text; // Obtener el texto de la respuesta
    }

    // Función para enviar mensajes del usuario al chat
    async function sendMessage() {
        var userMessage = userInput.value;
        appendMessage('Usuario', userMessage);

        if (!userMessage) {
            // Si el mensaje del usuario está vacío, no hacemos nada
            return;
        }

        // Llamar a la función de OpenAI para obtener la respuesta del modelo
        var botResponse = await getCompletion(userMessage);

        appendMessage('Chatbot', botResponse);
        userInput.value = ''; // Limpiar el campo de entrada después de enviar el mensaje
    }

    // Función para agregar mensajes al cuadro de chat
    function appendMessage(sender, message) {
        var messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
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

