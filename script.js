// ============================================================
// PETUALANGAN MATEMATIKA PULAU HARTA KARUN
// script.js
// ============================================================

const TOTAL_QUESTIONS = 10;

let currentQuestionIndex = 0;
let scoreStars = 0;
let currentQuestionData = null;
let hintUsed = false;

let introTimerInterval = null;
let introCountdown = 5;

let isAudioMuted = false;
let audioCtx = null;


// ============================================================
// AUDIO
// ============================================================

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}


function toggleSound() {
  isAudioMuted = !isAudioMuted;

  const button = document.getElementById("sound-btn");

  if (button) {
    button.textContent = isAudioMuted ? "🔇" : "🔊";
  }
}


function playSound(type) {

  if (isAudioMuted) {
    return;
  }

  initAudio();

  if (!audioCtx) {
    return;
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  try {

    const now = audioCtx.currentTime;

    // ====================================================
    // BENAR
    // ====================================================

    if (type === "correct") {

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = "triangle";

      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3);

      gain.gain.setValueAtTime(0.3, now);

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.5
      );

      osc.start(now);
      osc.stop(now + 0.5);
    }


    // ====================================================
    // SALAH
    // ====================================================

    else if (type === "incorrect") {

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = "sawtooth";

      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(174.61, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.4
      );

      osc.start(now);
      osc.stop(now + 0.4);
    }


    // ====================================================
    // KEMENANGAN
    // ====================================================

    else if (type === "victory") {

      const notes = [
        523.25,
        659.25,
        783.99,
        1046.50,
        1318.51
      ];

      notes.forEach((frequency, index) => {

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        const startTime =
          now + index * 0.12;

        osc.type = "triangle";

        osc.frequency.setValueAtTime(
          frequency,
          startTime
        );

        gain.gain.setValueAtTime(
          0.3,
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.3
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    }

    // ====================================================
    // INTRO PETUALANGAN
    // ====================================================

    else if (type === "intro") {

      const notes = [
        392.00,
        523.25,
        659.25
      ];

      notes.forEach((frequency, index) => {

        const osc =
          audioCtx.createOscillator();

        const gain =
          audioCtx.createGain();

        const startTime =
          now + index * 0.12;

        osc.type = "triangle";

        osc.frequency.setValueAtTime(
          frequency,
          startTime
        );

        gain.gain.setValueAtTime(
          0.001,
          startTime
        );

        gain.gain.linearRampToValueAtTime(
          0.25,
          startTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.35
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }


    // ====================================================
    // COUNTDOWN
    // ====================================================

    else if (type === "countdown") {

      const osc =
        audioCtx.createOscillator();

      const gain =
        audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = "sine";

      osc.frequency.setValueAtTime(
        880,
        now
      );

      gain.gain.setValueAtTime(
        0.22,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.12
      );

      osc.start(now);
      osc.stop(now + 0.12);
    }


    // ====================================================
    // MULAI PERMAINAN
    // ====================================================

    else if (type === "start") {

      const notes = [
        523.25,
        659.25,
        783.99,
        1046.50
      ];

      notes.forEach((frequency, index) => {

        const osc =
          audioCtx.createOscillator();

        const gain =
          audioCtx.createGain();

        const startTime =
          now + index * 0.1;

        osc.type = "triangle";

        osc.frequency.setValueAtTime(
          frequency,
          startTime
        );

        gain.gain.setValueAtTime(
          0.001,
          startTime
        );

        gain.gain.linearRampToValueAtTime(
          0.3,
          startTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.35
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }

    // ====================================================
    // KLIK
    // ====================================================

    else if (type === "click") {

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = "sine";

      osc.frequency.setValueAtTime(
        400,
        now
      );

      gain.gain.setValueAtTime(
        0.15,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.08
      );

      osc.start(now);
      osc.stop(now + 0.08);
    }

  } catch (error) {

    console.log(
      "Audio play error:",
      error
    );
  }
}


// ============================================================
// CERITA PENJUMLAHAN
// ============================================================

const storyTemplatesAddition = [

  {
    text: "Ciko menemukan {a} koin emas di pantai, lalu menemukan lagi {b} koin di dalam gua. Berapa jumlah koin emas Ciko seluruhnya?",
    icon: "🪙"
  },

  {
    text: "Kapten Ciko melihat {a} burung nuri di atas kapal. Kemudian {b} burung nuri lagi datang hinggap. Berapa jumlah burung nuri sekarang?",
    icon: "🦜"
  },

  {
    text: "Di tepi pantai ada {a} kerang ajaib. Ciko menemukan lagi {b} kerang berwarna merah. Berapa total kerang yang dikumpulkan Ciko?",
    icon: "🐚"
  },

  {
    text: "Ciko memasukkan {a} pisang ke dalam peti bekal. Temannya menambahkan {b} pisang lagi. Berapa jumlah pisang di peti?",
    icon: "🍌"
  },

  {
    text: "Ada {a} bintang laut di pasir pantai, lalu Ciko menemukan {b} bintang laut lagi. Berapa total bintang laut yang ada?",
    icon: "⭐"
  }

];


// ============================================================
// CERITA PENGURANGAN
// ============================================================

const storyTemplatesSubtraction = [

  {
    text: "Ciko mengumpulkan {a} kunci emas. Namun, {b} kunci jatuh ke dalam air laut. Berapa kunci emas yang tersisa?",
    icon: "🔑"
  },

  {
    text: "Kapten Ciko membawa {a} pisang manis. Saat istirahat, {b} pisang dimakan oleh monyet laut. Berapa sisa pisang Ciko?",
    icon: "🍌"
  },

  {
    text: "Ada {a} kelapa muda di atas pohon. Ciko memetik {b} kelapa untuk diminum. Berapa kelapa yang masih ada di pohon?",
    icon: "🥥"
  },

  {
    text: "Ciko menemukan {a} lembar peta harta karun. Ternyata {b} lembar peta basah terkena ombak. Berapa peta yang masih utuh?",
    icon: "📜"
  },

  {
    text: "Kapten Ciko menyimpan {a} permata berkilau, tetapi {b} permata hilang di perjalanan. Berapa permata Ciko sekarang?",
    icon: "💎"
  }

];


// ============================================================
// GENERATE QUESTION
// ============================================================

function generateQuestion() {

  hintUsed = false;

  const isAddition =
    Math.random() < 0.5;

  let num1;
  let num2;
  let answer;
  let story;
  let equation;


  // ========================================================
  // PENJUMLAHAN
  // ========================================================

  if (isAddition) {

    num1 =
      Math.floor(Math.random() * 25) + 1;

    num2 =
      Math.floor(Math.random() * 24) + 1;

    answer =
      num1 + num2;

    const template =
      storyTemplatesAddition[
      Math.floor(
        Math.random() *
        storyTemplatesAddition.length
      )
      ];

    story = {
      text: template.text
        .replace("{a}", num1)
        .replace("{b}", num2),

      icon: template.icon,

      typeBadge:
        "🏴‍☠️ Penjumlahan Harta"
    };

    equation =
      `${num1} + ${num2} = ?`;
  }


  // ========================================================
  // PENGURANGAN
  // ========================================================

  else {

    num1 =
      Math.floor(Math.random() * 45) + 5;

    num2 =
      Math.floor(Math.random() * num1) + 1;

    answer =
      num1 - num2;

    const template =
      storyTemplatesSubtraction[
      Math.floor(
        Math.random() *
        storyTemplatesSubtraction.length
      )
      ];

    story = {
      text: template.text
        .replace("{a}", num1)
        .replace("{b}", num2),

      icon: template.icon,

      typeBadge:
        "⚓ Pengurangan Harta"
    };

    equation =
      `${num1} - ${num2} = ?`;
  }


  // ========================================================
  // BUAT PILIHAN JAWABAN
  // ========================================================

  const options = [];

  // Masukkan jawaban benar
  options.push(answer);


  // Buat jawaban salah
  while (options.length < 4) {

    const offset =
      (Math.floor(Math.random() * 5) + 1) *
      (Math.random() < 0.5 ? 1 : -1);

    const wrongAnswer =
      answer + offset;

    if (
      wrongAnswer >= 0 &&
      wrongAnswer <= 50 &&
      !options.includes(wrongAnswer)
    ) {
      options.push(wrongAnswer);
    }
  }


  // ========================================================
  // ACAK POSISI JAWABAN
  // ========================================================

  for (
    let i = options.length - 1;
    i > 0;
    i--
  ) {

    const randomIndex =
      Math.floor(
        Math.random() * (i + 1)
      );

    const temporary =
      options[i];

    options[i] =
      options[randomIndex];

    options[randomIndex] =
      temporary;
  }


  // ========================================================
  // SIMPAN DATA SOAL
  // ========================================================

  currentQuestionData = {

    num1: num1,

    num2: num2,

    isAddition: isAddition,

    answer: answer,

    options: options,

    story: story,

    equation: equation
  };


  console.log(
    "SOAL:",
    currentQuestionData
  );


  renderQuestionCard();
}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQuestionCard() {

  if (!currentQuestionData) {
    return;
  }


  // --------------------------------------------------------
  // Badge
  // --------------------------------------------------------

  const badge =
    document.getElementById(
      "badge-operation"
    );

  if (badge) {
    badge.textContent =
      currentQuestionData.story.typeBadge;
  }


  // --------------------------------------------------------
  // Icon
  // --------------------------------------------------------

  const storyIcon =
    document.getElementById(
      "story-icon"
    );

  if (storyIcon) {
    storyIcon.textContent =
      currentQuestionData.story.icon;
  }


  // --------------------------------------------------------
  // Cerita
  // --------------------------------------------------------

  const storyText =
    document.getElementById(
      "story-text"
    );

  if (storyText) {
    storyText.textContent =
      currentQuestionData.story.text;
  }


  // --------------------------------------------------------
  // Persamaan
  // --------------------------------------------------------

  const equation =
    document.getElementById(
      "math-equation"
    );

  if (equation) {
    equation.textContent =
      currentQuestionData.equation;
  }


  // ========================================================
  // PILIHAN JAWABAN
  // ========================================================

  for (let i = 0; i < 4; i++) {

    const button =
      document.getElementById(
        `btn-opt-${i}`
      );

    const answerText =
      document.getElementById(
        `text-opt-${i}`
      );


    console.log(
      `Pilihan ${i}:`,
      currentQuestionData.options[i]
    );


    // Jika span ditemukan
    if (answerText) {

      answerText.textContent =
        String(
          currentQuestionData.options[i]
        );
    }


    // Aktifkan tombol
    if (button) {

      button.disabled = false;

      button.classList.remove(
        "opacity-40",
        "cursor-not-allowed"
      );
    }
  }


  updateUI();
}


// ============================================================
// UPDATE UI
// ============================================================

function updateUI() {

  const starCount =
    document.getElementById(
      "star-count"
    );

  if (starCount) {
    starCount.textContent =
      scoreStars;
  }


  const questionProgress =
    document.getElementById(
      "question-progress"
    );

  if (questionProgress) {

    questionProgress.textContent =
      `${currentQuestionIndex + 1}/${TOTAL_QUESTIONS}`;
  }


  const progressPercent =
    Math.min(
      100,
      Math.round(
        (
          currentQuestionIndex /
          TOTAL_QUESTIONS
        ) * 100
      )
    );


  const progressText =
    document.getElementById(
      "progress-text"
    );

  if (progressText) {

    progressText.textContent =
      `${progressPercent}% Sampai`;
  }


  const progressBar =
    document.getElementById(
      "progress-bar-fill"
    );

  if (progressBar) {

    progressBar.style.width =
      `${progressPercent}%`;
  }


  const avatar =
    document.getElementById(
      "ciko-avatar"
    );

  if (avatar) {

    avatar.style.left =
      `calc(4px + (${progressPercent} / 100) * (100% - 65px))`;
  }
}


// ============================================================
// HINT
// ============================================================

function provideHint() {

  playSound("click");

  const symbol =
    currentQuestionData.isAddition
      ? "+"
      : "-";

  const hintMessage =
    `Petunjuk Ciko: Hitung ${currentQuestionData.num1} ${symbol} ${currentQuestionData.num2} dengan teliti ya!`;

  const modal =
    document.getElementById(
      "feedback-modal"
    );

  document.getElementById(
    "modal-icon"
  ).textContent =
    "💡";

  document.getElementById(
    "modal-title"
  ).textContent =
    "Bantuan Ciko";

  document.getElementById(
    "modal-message"
  ).textContent =
    hintMessage;

  const nextButton =
    document.getElementById(
      "modal-next-btn"
    );

  nextButton.textContent =
    "Tutup Bantuan 💡";

  nextButton.onclick =
    function () {

      playSound("click");

      modal.classList.add(
        "hidden"
      );
    };

  modal.classList.remove(
    "hidden"
  );
}


// ============================================================
// CHECK ANSWER
// ============================================================

function checkAnswer(optionIndex) {

  if (!currentQuestionData) {
    return;
  }


  playSound("click");


  const selectedValue =
    currentQuestionData.options[
    optionIndex
    ];


  const correctAnswer =
    currentQuestionData.answer;


  const isCorrect =
    selectedValue === correctAnswer;


  console.log(
    "Jawaban dipilih:",
    selectedValue,
    "Jawaban benar:",
    correctAnswer
  );


  const modal =
    document.getElementById(
      "feedback-modal"
    );


  const nextButton =
    document.getElementById(
      "modal-next-btn"
    );


  // ========================================================
  // JAWABAN BENAR
  // ========================================================

  if (isCorrect) {

    scoreStars += 10;

    playSound("correct");


    if (typeof confetti === "function") {

      confetti({

        particleCount: 70,

        spread: 60,

        origin: {
          y: 0.6
        }
      });
    }


    document.getElementById(
      "modal-icon"
    ).textContent =
      "🎉";


    document.getElementById(
      "modal-title"
    ).textContent =
      "Hebat Sekali!";


    document.getElementById(
      "modal-message"
    ).textContent =
      "Jawabanmu tepat sekali! Ciko makin dekat dengan peti harta karun.";


    nextButton.textContent =
      "Lanjut Berlayar ➡️";


    nextButton.onclick =
      function () {

        playSound("click");

        modal.classList.add(
          "hidden"
        );

        nextQuestion();
      };
  }


  // ========================================================
  // JAWABAN SALAH
  // ========================================================

  else {

    playSound("incorrect");


    document.getElementById(
      "modal-icon"
    ).textContent =
      "💪";


    document.getElementById(
      "modal-title"
    ).textContent =
      "Ayo Coba Lagi!";


    document.getElementById(
      "modal-message"
    ).textContent =
      `Hampir benar! Jawaban yang tepat adalah ${correctAnswer}. Tetap semangat!`;


    nextButton.textContent =
      "Lanjut Soal Berikutnya ➡️";


    nextButton.onclick =
      function () {

        playSound("click");

        modal.classList.add(
          "hidden"
        );

        nextQuestion();
      };
  }


  modal.classList.remove(
    "hidden"
  );
}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

  currentQuestionIndex++;


  if (
    currentQuestionIndex >=
    TOTAL_QUESTIONS
  ) {

    showVictoryScreen();

  } else {

    generateQuestion();
  }
}


// ============================================================
// VICTORY
// ============================================================

function showVictoryScreen() {

  playSound("victory");


  if (typeof confetti === "function") {

    confetti({

      particleCount: 150,

      spread: 100,

      origin: {
        y: 0.5
      }
    });
  }


  const finalStars =
    document.getElementById(
      "final-stars"
    );

  if (finalStars) {

    finalStars.textContent =
      `⭐ ${scoreStars}`;
  }


  let badgeText =
    "Penjelajah Ulung 🦜";


  if (scoreStars >= 90) {

    badgeText =
      "Kapten Laut Sejati 👑";

  } else if (scoreStars >= 70) {

    badgeText =
      "Mualim Handal ⚓";
  }


  const finalBadge =
    document.getElementById(
      "final-badge"
    );

  if (finalBadge) {

    finalBadge.textContent =
      badgeText;
  }


  const victoryModal =
    document.getElementById(
      "victory-modal"
    );

  if (victoryModal) {

    victoryModal.classList.remove(
      "hidden"
    );
  }
}


// ============================================================
// RESTART
// ============================================================

function restartGame() {

  playSound("click");

  // Reset semua data permainan
  currentQuestionIndex = 0;
  scoreStars = 0;
  currentQuestionData = null;
  hintUsed = false;

  // Tutup layar kemenangan
  const victoryModal =
    document.getElementById("victory-modal");

  if (victoryModal) {
    victoryModal.classList.add("hidden");
  }

  // Tampilkan kembali layar pembuka
  const introModal =
    document.getElementById("intro-modal");

  if (introModal) {

    introModal.classList.remove(
      "hidden",
      "opacity-0",
      "pointer-events-none"
    );
  }

  // Mulai ulang countdown intro
  showIntroScreen();
}


// ============================================================
// INTRO SCREEN
// ============================================================

function showIntroScreen() {

  introCountdown = 5;

  playSound("intro");

  const timerBar =
    document.getElementById(
      "intro-timer-bar"
    );


  const countdownText =
    document.getElementById(
      "intro-countdown-text"
    );


  if (timerBar) {

    timerBar.style.width =
      "100%";
  }


  if (countdownText) {

    countdownText.textContent =
      `${introCountdown} Detik`;
  }


  if (introTimerInterval) {

    clearInterval(
      introTimerInterval
    );
  }


  introTimerInterval =
    setInterval(
      function () {

        introCountdown--;

        playSound("countdown");

        if (countdownText) {

          countdownText.textContent =
            `${introCountdown} Detik`;
        }


        if (timerBar) {

          timerBar.style.width =
            `${(introCountdown / 5) * 100}%`;
        }


        if (introCountdown <= 0) {

          playSound("start");

          closeIntroAndStartGame();
        }

      },
      1000
    );
}


// ============================================================
// CLOSE INTRO
// ============================================================

function closeIntroAndStartGame() {

  if (introTimerInterval) {

    clearInterval(
      introTimerInterval
    );

    introTimerInterval = null;
  }


  const introModal =
    document.getElementById(
      "intro-modal"
    );


  if (introModal) {

    introModal.classList.add(
      "opacity-0",
      "pointer-events-none"
    );


    setTimeout(
      function () {

        introModal.classList.add(
          "hidden"
        );

      },
      500
    );
  }


  playSound("victory");

  startNewGame();
}


// ============================================================
// START GAME
// ============================================================

function startNewGame() {

  currentQuestionIndex = 0;

  scoreStars = 0;

  currentQuestionData = null;

  updateUI();

  generateQuestion();
}


// ============================================================
// EVENT LISTENERS
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    // ----------------------------------------------------
    // SOUND
    // ----------------------------------------------------

    const soundButton =
      document.getElementById(
        "sound-btn"
      );

    if (soundButton) {

      soundButton.addEventListener(
        "click",
        toggleSound
      );
    }


    // ----------------------------------------------------
    // HINT
    // ----------------------------------------------------

    const hintButton =
      document.getElementById(
        "btn-hint"
      );

    if (hintButton) {

      hintButton.addEventListener(
        "click",
        provideHint
      );
    }


    // ----------------------------------------------------
    // PILIHAN JAWABAN A-D
    // ----------------------------------------------------

    for (let i = 0; i < 4; i++) {

      const answerButton =
        document.getElementById(
          `btn-opt-${i}`
        );

      if (answerButton) {

        answerButton.addEventListener(
          "click",
          function () {

            checkAnswer(i);
          }
        );
      }
    }


    // ----------------------------------------------------
    // RESTART
    // ----------------------------------------------------

    const restartButton =
      document.getElementById(
        "restart-btn"
      );

    if (restartButton) {

      restartButton.addEventListener(
        "click",
        restartGame
      );
    }


    // ----------------------------------------------------
    // TOMBOL INTRO
    // ----------------------------------------------------

    const introModal =
      document.getElementById(
        "intro-modal"
      );


    if (introModal) {

      const introButton =
        introModal.querySelector(
          "button"
        );


      if (introButton) {

        introButton.addEventListener(
          "click",
          closeIntroAndStartGame
        );
      }
    }
  }
);


// ============================================================
// START INTRO SAAT HALAMAN SELESAI DIMUAT
// ============================================================

window.addEventListener(
  "load",
  function () {

    showIntroScreen();
  }
);