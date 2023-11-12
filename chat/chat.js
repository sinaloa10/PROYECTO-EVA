
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    var chatBox = document.getElementById('chat-box');
    var userInput = document.getElementById('user-input');
    var userResponseCount = 0;


    var userMessages = [];
    var botMessages = [];
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
                max_tokens: 3000, // Ajusta este valor según lo que consideres apropiado
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content; // Obtener el texto de la respuesta
    }

    // Función para mostrar el indicador de escritura con puntos progresivos
    function showTypingIndicator() {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        var messageElement = document.createElement('div');
        messageElement.classList.add('bot-message');

        var bubbleElement = document.createElement('div');
        bubbleElement.classList.add('message-bubble', 'bot-bubble');

        var dots = 1;

        function updateDots() {
            bubbleElement.innerHTML = '.'.repeat(dots);
            dots = (dots % 3) + 1; // Cambiar entre 1, 2 y 3
            setTimeout(updateDots, 500); // Cambia cada 500ms (ajusta según tu preferencia)
        }

        updateDots(); // Iniciar la secuencia de puntos
        messageElement.appendChild(bubbleElement);
        messageContainer.appendChild(messageElement);

        chatBox.appendChild(messageContainer);
        // Hacer scroll hacia abajo para mostrar el último mensaje
        chatBox.scrollTop = chatBox.scrollHeight;
    }




    // Función para enviar mensajes del usuario al chat
    async function sendMessage() {
        var userMessage = userInput.value;
        appendMessage('Usuario', userMessage);

        console.log(userMessages);

        if (!userMessage) {
            return;
        }

        userInput.value = '';

        // Mostrar indicador de escritura progresiva mientras el bot responde
        showTypingIndicator();

        // Definir los mensajes del sistema y del usuario
        var userMessageObject = {
            "role": "user",
            "content": userMessage
        };

        userMessages.push(userMessage);

        var messages = [
            {
                "role": "system",
                "content": "You are a compassionate, charismatic, and empathetic artificial intelligence assistant for mental health named Eva, providing services for a mental health association called DREXER. Your task is to be a support for the user, offering advice. In the event that the user is in danger of harming themselves, recommend the professionals at DREXER. do not give very long answer    s so as not to overwhelm the user"
            },
            userMessageObject
        ];

        // Llamar a la función de OpenAI para obtener la respuesta del modelo
        var botResponse = await getCompletion(messages);

        // Almacenar el mensaje del bot
        var botMessageObject = {
            "role": "EVA",
            "content": botResponse
        };

        botMessages.push(botResponse);

        // Eliminar el indicador de escritura antes de mostrar la respuesta real
        chatBox.lastChild.remove();

        appendMessage('EVA', botResponse);

        // Incrementar el contador de respuestas del usuario
        userResponseCount++;

        // Llamar a la función de análisis cuando el usuario envíe 5 respuestas
        if (userResponseCount === 2) {
            analyzeMessage();
        }
    }


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




    //ANALISIS DE DATOS, SEGUNDA VERSIÓN DE LA INTELIGENCIA ARTIFICIAL



    // Función para enviar mensajes del usuario al chat
    async function analyzeMessage() {
        var userMessage = "DIME LOS PORCENTAJES DE ENOJO, TRISTEZA, ALEGRÍA Y ANGUSTIA DEL USUARIO. MENSAJES DEL USUARIO: " + userMessages + " RESPUESTAS DE LA INTELIGENCIA ARTIFICIAL: " + botMessages;

        if (!userMessage) {
            return;
        }


        // Definir los mensajes del sistema y del usuario
        var userMessageObject = {
            "role": "user",
            "content": userMessage
        };


        var messages = [
            {
                "role": "system",
                "content": "You will be a tool for deep analysis, which will analyze a conversation between a user and an artificial intelligence (which is an intelligence for analyzing the user's mental health status) that will only provide relevant data about the user to assist a psychologist in decision-making"
            },
            userMessageObject
        ];

        // Llamar a la función de OpenAI para obtener la respuesta del modelo
        var botResponseAn = await getCompletion(messages);


        console.log(botResponseAn);

        // Llamar a la función de OpenAI para obtener la respuesta del modelo
        var botResponseAn = await getCompletion(messages);

        // Crear un Blob con el contenido del análisis
        var blob = new Blob([botResponseAn], { type: 'text/plain' });

        // Crear un enlace para descargar el archivo
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'analisis.txt';

        // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Eliminar el enlace después de la descarga
        document.body.removeChild(link);
    }




});














