// ========================================
// SMARTAGRO AI - FRONTEND JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // NAVIGATION
  // ========================================

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ========================================
  // CATEGORY CARDS
  // ========================================

  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.querySelector("h3")?.textContent;

      if (!category) return;

      showNotification(
        `${category} selected. SmartAgro AI will provide more information soon.`,
      );
    });
  });

  // ========================================
  // AI ASSISTANT BUTTON
  // ========================================

  const openAiButton = document.getElementById("openAiButton");

  if (openAiButton) {
    openAiButton.addEventListener("click", () => {
      openAiAssistant();
    });
  }

  // ========================================
  // BUTTON ANIMATION
  // ========================================

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.style.transform = "scale(0.97)";

      setTimeout(() => {
        button.style.transform = "";
      }, 120);
    });
  });

  // ========================================
  // AI ASSISTANT
  // ========================================

  function openAiAssistant() {
    const existingAssistant = document.getElementById("aiModal");

    if (existingAssistant) {
      existingAssistant.remove();
    }

    const modal = document.createElement("div");

    modal.id = "aiModal";

    modal.innerHTML = `

      <div class="ai-modal-overlay">

        <div class="ai-modal">

          <button
            type="button"
            class="ai-close"
            id="closeAiModal"
            aria-label="Close AI assistant"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="ai-modal-icon">
            <i class="fa-solid fa-robot"></i>
          </div>

          <h2>SmartAgro AI Assistant</h2>

          <p>
            Ask a farming or agriculture question.
          </p>

          <div class="ai-chat" id="aiChat">

            <div class="ai-message bot">
              Hello! I am SmartAgro AI.
              How can I help you with agriculture today?
            </div>

          </div>

          <form id="aiForm" class="ai-form">

            <input
              type="text"
              id="aiInput"
              placeholder="Ask about crops, farming..."
              autocomplete="off"
              required
            >

            <button
              type="submit"
              aria-label="Send question"
            >
              <i class="fa-solid fa-paper-plane"></i>
            </button>

          </form>

        </div>

      </div>

    `;

    document.body.appendChild(modal);

    // Close button

    const closeButton = document.getElementById("closeAiModal");

    closeButton.addEventListener("click", () => {
      modal.remove();
    });

    // Close when clicking outside

    const overlay = modal.querySelector(".ai-modal-overlay");

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        modal.remove();
      }
    });

    // AI form

const aiForm = document.getElementById("aiForm");

aiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.getElementById("aiInput");

  const question = input.value.trim();

  if (!question) return;

  addUserMessage(question);

  input.value = "";

  addBotMessage("SmartAgro AI is thinking...");

  try {
    const response = await fetch("/api/ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question
      })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    const chat = document.getElementById("aiChat");

    const messages = chat.querySelectorAll(".ai-message.bot");

    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      lastMessage.textContent =
        data.answer || "Sorry, I could not generate a response.";
    }

  } catch (error) {
    console.error("AI request failed:", error);

    const chat = document.getElementById("aiChat");

    const messages = chat.querySelectorAll(".ai-message.bot");

    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      lastMessage.textContent =
        "I couldn't connect to SmartAgro AI. Please make sure the backend is running.";
    }
  }
});

  // ========================================
  // ADD USER MESSAGE
  // ========================================

  function addUserMessage(message) {
    const chat = document.getElementById("aiChat");

    if (!chat) return;

    const messageElement = document.createElement("div");

    messageElement.className = "ai-message user";

    messageElement.textContent = message;

    chat.appendChild(messageElement);

    chat.scrollTop = chat.scrollHeight;
  }

  // ========================================
  // ADD AI MESSAGE
  // ========================================

  function addBotMessage(message) {
    const chat = document.getElementById("aiChat");

    if (!chat) return;

    const messageElement = document.createElement("div");

    messageElement.className = "ai-message bot";

    messageElement.textContent = message;

    chat.appendChild(messageElement);

    chat.scrollTop = chat.scrollHeight;
  }

  // ========================================
  // TEMPORARY LOCAL AI
  // ========================================

  function generateLocalAIResponse(question) {
    const text = question.toLowerCase();

    if (text.includes("tomato") || text.includes("tomatoes")) {
      return `
Tomatoes need good sunlight, fertile soil,
regular watering and proper spacing.
Avoid keeping the soil constantly waterlogged.
      `;
    }

    if (text.includes("maize") || text.includes("corn")) {
      return `
Maize grows best with adequate sunlight,
good soil preparation and sufficient water.
Good-quality seeds and proper spacing are
important for healthy growth.
      `;
    }

    if (text.includes("vegetable") || text.includes("vegetables")) {
      return `
For vegetables, start with healthy seeds,
prepare fertile soil, provide adequate water,
and monitor the plants regularly for pests
and diseases.
      `;
    }

    if (text.includes("seed") || text.includes("seeds")) {
      return `
Choose healthy, high-quality seeds that are
appropriate for your environment and crop.
Good seeds can give your plants a stronger
start.
      `;
    }

    if (text.includes("fertilizer") || text.includes("fertiliser")) {
      return `
Fertilizer should be selected according to
the crop and soil needs. Avoid applying more
than recommended because excessive fertilizer
can damage plants.
      `;
    }

    if (text.includes("farm") || text.includes("farming")) {
      return `
Smart farming involves planning, good soil
management, appropriate crop selection,
efficient water use and regular monitoring
of crops.
      `;
    }

    if (text.includes("hello") || text.includes("hi")) {
      return `
Hello! I am SmartAgro AI. Ask me about crops,
farming, seeds, vegetables or agriculture.
      `;
    }

    return `
Thanks for your question.

I am currently running in SmartAgro's
local demonstration mode.

In the next phase, we will connect me to
the SmartAgro backend so I can provide
more advanced AI-powered agricultural
assistance.
    `;
  }

  // ========================================
  // NOTIFICATION
  // ========================================

  function showNotification(message) {
    const oldNotification = document.querySelector(".smart-notification");

    if (oldNotification) {
      oldNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className = "smart-notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("hide");

      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});
