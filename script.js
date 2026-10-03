// Emoji-Icons für Quiz
const emoji = {
  Bewegung: "🚶",
  Überproduktion: "🏭",
  Bestände: "📦",
  Wartezeiten: "⏳",
  Überbearbeitung: "🛠️",
  Transport: "🚚",
  Nacharbeit: "❌",
  Talentverschwendung: "💡",
  Energieverschwendung: "⚡"
};

// SVG-Icons für Dashboard
const svgIcons = {
  Bewegung: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M13 3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-6 7h6l4 5l-1.5 1.5L13 13v8h-2v-6l-3 3l-1.5-1.5z"/></svg>`,
  Überproduktion: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M3 3h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z"/></svg>`,
  Bestände: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M3 3h18v6H3zm0 8h18v10H3z"/></svg>`,
  Wartezeiten: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 11h5v2h-7V7h2z"/></svg>`,
  Überbearbeitung: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M2 2h20v4H2zm0 6h20v4H2zm0 6h20v4H2zm0 6h20v4H2z"/></svg>`,
  Transport: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#2563eb" d="M3 7h13v10H3zm13 3h5l-2-3h-3z"/></svg>`,
  Nacharbeit: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#ef4444" d="M12 2L2 22h20zm0 6l1 8h-2zm0 10a1 1 0 1 1-1 1a1 1 0 0 1 1-1"/></svg>`,
  Talentverschwendung: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#10b981" d="M12 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0 12c-5 0-9 3-9 6v2h18v-2c0-3-4-6-9-6"/></svg>`,
  Energieverschwendung: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="#facc15" d="M13 2L3 14h7l-1 8l10-12h-7z"/></svg>`
};

// Fragen (Reihenfolge bleibt fix)
const questions = [
  {
    text: "Ein Mitarbeiter muss regelmäßig Werkzeuge suchen, weil der Arbeitsplatz nicht ergonomisch gestaltet ist. Welche Verschwendungsart entsteht?",
    answers: ["Bewegung", "Transport", "Bestände", "Wartezeiten"],
    correctIndex: 0,
    category: "Bewegung"
  },
  {
    text: "Ein Bereich produziert Bauteile, obwohl der Kunde aktuell keine Bestellung dafür hat. Welche Verschwendung liegt vor?",
    answers: ["Überproduktion", "Überbearbeitung", "Bestände", "Nacharbeit"],
    correctIndex: 0,
    category: "Überproduktion"
  },
  {
    text: "Material wird gelagert, um mögliche zukünftige Engpässe abzufangen. Welche Verschwendungsart entsteht dadurch?",
    answers: ["Bestände", "Transport", "Wartezeiten", "Talentverschwendung"],
    correctIndex: 0,
    category: "Bestände"
  },
  {
    text: "Ein Prozess steht still, weil eine Entscheidung des Teamleiters fehlt. Welche Verschwendung entsteht?",
    answers: ["Wartezeiten", "Bewegung", "Transport", "Nacharbeit"],
    correctIndex: 0,
    category: "Wartezeiten"
  },
  {
    text: "Ein Produkt wird mehrfach geprüft, obwohl der Kunde diese Qualität nicht verlangt. Welche Verschwendung entsteht?",
    answers: ["Überbearbeitung", "Transport", "Bestände", "Bewegung"],
    correctIndex: 0,
    category: "Überbearbeitung"
  },
  {
    text: "Material wird über weite Strecken transportiert, obwohl es näher gelagert werden könnte. Welche Verschwendung entsteht?",
    answers: ["Transport", "Bewegung", "Bestände", "Wartezeiten"],
    correctIndex: 0,
    category: "Transport"
  },
  {
    text: "Ein Bauteil weist Fehler auf und muss nachgearbeitet werden. Welche Verschwendung entsteht?",
    answers: ["Nacharbeit", "Überproduktion", "Transport", "Talentverschwendung"],
    correctIndex: 0,
    category: "Nacharbeit"
  },
  {
    text: "Die Fähigkeiten eines Mitarbeiters werden nicht genutzt, obwohl er Verbesserungspotenzial erkennt. Welche Verschwendung entsteht?",
    answers: ["Talentverschwendung", "Bestände", "Transport", "Überbearbeitung"],
    correctIndex: 0,
    category: "Talentverschwendung"
  },
  {
    text: "Eine Maschine verbraucht deutlich mehr Energie als notwendig. Welche Verschwendung entsteht?",
    answers: ["Energieverschwendung", "Wartezeiten", "Bewegung", "Nacharbeit"],
    correctIndex: 0,
    category: "Energieverschwendung"
  }
];

let currentIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
const answersGiven = [];
let leanChart = null;
let attemptsCount = 0;

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// DOM-Elemente
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const certificateScreen = document.getElementById("certificate-screen");

const startBtn = document.getElementById("start-btn");
const startEndBtn = document.getElementById("start-end-btn");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const endBtn = document.getElementById("end-btn");
const resultEndBtn = document.getElementById("result-end-btn");

const restartBtn = document.getElementById("restart-btn");
const dashboardBtn = document.getElementById("dashboard-btn");
const dashboardRestartBtn = document.getElementById("dashboard-restart-btn");
const dashboardBackBtn = document.getElementById("dashboard-back-btn");

const questionCounter = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const categoryBadge = document.getElementById("category-badge");

const scoreText = document.getElementById("score-text");
const attemptsText = document.getElementById("attempts-text");
const attemptsTextDashboard = document.getElementById("attempts-text-dashboard");
const detailsContainer = document.getElementById("details");
const dashboardContainer = document.getElementById("dashboard");

const darkModeToggle = document.getElementById("dark-mode-toggle");
const resetAttemptsBtn = document.getElementById("reset-attempts-btn");

const userNameInput = document.getElementById("user-name");
const certificateBtn = document.getElementById("certificate-btn");
const certificateName = document.getElementById("certificate-name");
const certificateScore = document.getElementById("certificate-score");
const certificateDate = document.getElementById("certificate-date");
const certificatePrintBtn = document.getElementById("certificate-print-btn");
const certificateBackBtn = document.getElementById("certificate-back-btn");

// Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDashboardVisible = !dashboardScreen.classList.contains("hidden");
  if (isDashboardVisible && answersGiven.length > 0) {
    showDashboard();
  }
});

// Events
startBtn.addEventListener("click", startQuiz);

if (startEndBtn) {
  startEndBtn.addEventListener("click", () => {
    restartQuiz();
  });
}

nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", goBack);
endBtn.addEventListener("click", endQuizEarly);

if (resultEndBtn) {
  resultEndBtn.addEventListener("click", () => {
    restartQuiz();
  });
}

restartBtn.addEventListener("click", restartQuiz);
dashboardBtn.addEventListener("click", showDashboard);
dashboardRestartBtn.addEventListener("click", restartQuiz);
dashboardBackBtn.addEventListener("click", () => {
  dashboardScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
});

resetAttemptsBtn.addEventListener("click", () => {
  attemptsCount = 0;
  updateAttemptsUI();
});

certificateBtn.addEventListener("click", showCertificate);
certificatePrintBtn.addEventListener("click", () => {
  window.print();
});
certificateBackBtn.addEventListener("click", () => {
  certificateScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
});

function startQuiz() {
  currentIndex = 0;
  score = 0;
  selectedAnswerIndex = null;
  answersGiven.length = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  dashboardScreen.classList.add("hidden");
  certificateScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  progressBar.style.width = "0%";

  prevBtn.disabled = true;
  nextBtn.disabled = true;

  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];

  categoryBadge.textContent = `${emoji[q.category]} MUDA`;

  questionText.textContent = q.text;
  questionCounter.textContent = `Frage ${currentIndex + 1} von ${questions.length}`;

  const percent = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;

  answersContainer.innerHTML = "";
  selectedAnswerIndex = null;
  nextBtn.disabled = true;

  const shuffledAnswers = shuffle([...q.answers]);

  shuffledAnswers.forEach((answerText) => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.textContent = answerText;
    btn.addEventListener("click", () => selectAnswer(q.answers.indexOf(answerText)));
    answersContainer.appendChild(btn);
  });

  if (answersGiven[currentIndex]) {
    const previousAnswer = answersGiven[currentIndex].selected;
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((el) => {
      if (el.textContent === previousAnswer) {
        el.classList.add("selected");
        selectedAnswerIndex = q.answers.indexOf(previousAnswer);
        nextBtn.disabled = false;
      }
    });
  }

  prevBtn.disabled = currentIndex === 0;
}

function selectAnswer(index) {
  selectedAnswerIndex = index;

  const answerElements = document.querySelectorAll(".answer");
  answerElements.forEach((el) => {
    const answerIndex = questions[currentIndex].answers.indexOf(el.textContent);
    el.classList.toggle("selected", answerIndex === index);
  });

  nextBtn.disabled = false;
}

function handleNext() {
  if (selectedAnswerIndex === null) return;

  const q = questions[currentIndex];
  const isCorrect = selectedAnswerIndex === q.correctIndex;

  answersGiven[currentIndex] = {
    question: q.text,
    selected: q.answers[selectedAnswerIndex],
    correct: q.answers[q.correctIndex],
    category: q.category,
    icon: svgIcons[q.category],
    isCorrect
  };

  score = answersGiven.reduce((sum, item) => {
    return sum + (item?.isCorrect ? 1 : 0);
  }, 0);

  showImmediateFeedback(isCorrect);

  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  }, 600);
}

function showImmediateFeedback(isCorrect) {
  const answerElements = document.querySelectorAll(".answer");
  const q = questions[currentIndex];

  answerElements.forEach((el) => {
    const answerIndex = q.answers.indexOf(el.textContent);
    el.classList.remove("selected");

    if (answerIndex === q.correctIndex) {
      el.classList.add("correct");
    } else if (answerIndex === selectedAnswerIndex && !isCorrect) {
      el.classList.add("wrong");
    }
  });

  nextBtn.disabled = true;
}

function goBack() {
  if (currentIndex === 0) return;

  currentIndex--;

  renderQuestion();

  const q = questions[currentIndex];
  const previousAnswer = answersGiven[currentIndex]?.selected;

  if (previousAnswer) {
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((el) => {
      if (el.textContent === previousAnswer) {
        el.classList.add("selected");
        selectedAnswerIndex = q.answers.indexOf(previousAnswer);
        nextBtn.disabled = false;
      }
    });
  }

  const percent = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function endQuizEarly() {
  score = answersGiven.reduce((sum, item) => {
    return sum + (item?.isCorrect ? 1 : 0);
  }, 0);
  showResults();
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  dashboardScreen.classList.add("hidden");
  certificateScreen.classList.add("hidden");

  progressBar.style.width = "100%";

  score = answersGiven.reduce((sum, item) => {
    return sum + (item?.isCorrect ? 1 : 0);
  }, 0);

  scoreText.textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`;

  attemptsCount++;
  updateAttemptsUI();

  detailsContainer.innerHTML = "";
  answersGiven.forEach((item) => {
    if (!item) return;
    const div = document.createElement("div");
    div.className = "detail-item";
    div.innerHTML = `
      <strong>Kategorie:</strong> ${item.icon} ${item.category}<br>
      <strong>Frage:</strong> ${item.question}<br>
      <strong>Deine Antwort:</strong> ${item.selected} (${item.isCorrect ? "richtig" : "falsch"})<br>
      <strong>Korrekte Antwort:</strong> ${item.correct}
    `;
    detailsContainer.appendChild(div);
  });
}

function updateAttemptsUI() {
  attemptsText.textContent = `Anzahl der Versuche: ${attemptsCount}`;
  attemptsTextDashboard.textContent = `Anzahl der Versuche: ${attemptsCount}`;
}

function showDashboard() {
  resultScreen.classList.add("hidden");
  dashboardScreen.classList.remove("hidden");
  certificateScreen.classList.add("hidden");

  dashboardContainer.innerHTML = "";

  const categories = {};

  answersGiven.forEach((item) => {
    if (!item) return;
    if (!categories[item.category]) {
      categories[item.category] = { correct: 0, total: 0, icon: item.icon };
    }
    categories[item.category].total++;
    if (item.isCorrect) categories[item.category].correct++;
  });

  const sortedCats = Object.keys(categories).sort((a, b) => {
    if (a === "Überproduktion") return -1;
    if (b === "Überproduktion") return 1;
    return a.localeCompare(b, "de");
  });

  const labels = [];
  const dataPercent = [];

  sortedCats.forEach((cat) => {
    const c = categories[cat];
    const percent = Math.round((c.correct / c.total) * 100);

    labels.push(cat);
    dataPercent.push(percent);

    const div = document.createElement("div");
    div.className = "dashboard-item";
    div.innerHTML = `
      ${c.icon} <strong>${cat}</strong><br>
      Richtig: ${c.correct} / ${c.total} (${percent}%)
    `;
    dashboardContainer.appendChild(div);
  });

  const ctx = document.getElementById("leanChart").getContext("2d");

  if (leanChart) {
    leanChart.destroy();
  }

  const isDark = document.body.classList.contains("dark");
  const axisColor = isDark ? "#f1f5f9" : "#0f172a";

  leanChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Richtig in %",
          data: dataPercent,
          backgroundColor: isDark
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(37, 99, 235, 0.8)",
          borderColor: "#ffffff",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      indexAxis: "y",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: axisColor
          }
        },
        title: {
          display: true,
          text: "Lean‑Auswertung nach Verschwendungsarten (Richtig in %)",
          color: axisColor
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10,
            color: axisColor,
            font: {
              size: 14,
              weight: "600"
            }
          },
          grid: {
            color: isDark
              ? "rgba(241, 245, 249, 0.25)"
              : "rgba(148, 163, 184, 0.4)"
          }
        },
        y: {
          ticks: {
            color: axisColor,
            font: {
              size: 14,
              weight: "600"
            }
          },
          grid: {
            color: isDark
              ? "rgba(241, 245, 249, 0.25)"
              : "rgba(148, 163, 184, 0.4)"
          }
        }
      }
    }
  });

  updateAttemptsUI();
}

function showCertificate() {
  const name = userNameInput.value.trim();
  if (!name) {
    alert("Bitte gib deinen Namen für das Zertifikat ein.");
    return;
  }

  certificateName.textContent = name;
  certificateScore.textContent = `Ergebnis: ${score} von ${questions.length} Fragen richtig beantwortet.`;

  const today = new Date();
  const dateStr = today.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  certificateDate.textContent = dateStr;

  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  dashboardScreen.classList.add("hidden");
  certificateScreen.classList.remove("hidden");
}

function restartQuiz() {
  startScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  dashboardScreen.classList.add("hidden");
  certificateScreen.classList.add("hidden");
  progressBar.style.width = "0%";
}
