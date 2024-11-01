// Custom JavaScript (if needed)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada');
  });

  
  // Efecto de entrada al desplazarse
document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => {
      const position = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      if (position < screenPosition) {
        el.classList.add("visible");
      }
    });
  });



  const apiKey = "TU_CLAVE_API"; // Reemplaza esto con tu clave de API

  document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
  
    // Muestra el mensaje del usuario
    addMessage("user", userInput);
  
    // Llama a la API de IA
    const response = await getAIResponse(userInput);
  
    // Muestra y reproduce la respuesta del bot
    addMessage("bot", response);
    speak(response);
  
    // Limpia el input
    document.getElementById("userInput").value = "";
  });
  
  function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "message user-message" : "message bot-message";
    messageDiv.textContent = text;
    document.getElementById("messages").appendChild(messageDiv);
  }
  
  // Función para obtener la respuesta de IA
  async function getAIResponse(prompt) {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error en la API:", error);
      return "Lo siento, ocurrió un error. Inténtalo de nuevo.";
    }
  }
  
  // Función para convertir texto en voz
  function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES"; // Ajusta el idioma si es necesario
    synth.speak(utterance);
  }
  