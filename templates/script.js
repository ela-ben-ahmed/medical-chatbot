const form = document.getElementById("messageArea");
const input = document.getElementById("text");
const messages = document.getElementById("messages");
const quickButtons = document.querySelectorAll(".quick-btn");

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function addMessage(text, type) {
  const bubble = document.createElement("div");
  bubble.className = "msg " + type;
  bubble.innerHTML = `${text}<small>${getTime()}</small>`;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function getLocalResponse(rawText) {
  const text = rawText.toLowerCase();

  const emergencyKeywords = [
    "douleur thoracique",
    "essoufflement",
    "difficulte respiratoire",
    "perte de connaissance",
    "saignement",
    "confusion"
  ];

  if (emergencyKeywords.some(function (keyword) { return text.includes(keyword); })) {
    return "Ton message contient des signes qui peuvent etre graves. Va rapidement aux urgences ou appelle les secours.";
  }

  if (text.includes("fievre")) {
    return "Pour la fievre: repose-toi, bois beaucoup d'eau et surveille ta temperature. Si la fievre dure ou monte fort, consulte un medecin.";
  }

  if (text.includes("toux")) {
    return "Pour la toux: hydrate-toi, evite la fumee et repose-toi. Si la toux dure plus d'une semaine ou gene la respiration, consulte.";
  }

  if (text.includes("mal de tete") || text.includes("migraine")) {
    return "Pour le mal de tete: repose-toi dans un endroit calme, hydrate-toi et surveille l'evolution. Si la douleur est brutale et inhabituelle, consulte vite.";
  }

  if (text.includes("gorge")) {
    return "Pour le mal de gorge: bois des liquides tiedes, repose-toi et surveille la fievre. Si ca persiste plusieurs jours, consulte un professionnel.";
  }

  return "Je peux t'aider avec des conseils generaux sur les symptomes. Donne plus de details: depuis quand, intensite de la douleur, presence de fievre, et autres signes.";
}

function sendMessage(rawText) {
  if (!rawText.trim()) return;
  addMessage(rawText, "user");
  const answer = getLocalResponse(rawText);
  setTimeout(function () {
    addMessage(answer, "bot");
  }, 300);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const rawText = input.value;
  input.value = "";
  sendMessage(rawText);
});

quickButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const question = button.dataset.question;
    sendMessage(question);
  });
});

addMessage(
  "Bienvenue. Je suis un chatbot medical base sur les symptomes. Je peux t'aider a mieux comprendre ta situation et te conseiller quand consulter. Important: je ne remplace pas un medecin.",
  "bot"
);