const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["W", "O2", "H2O", "CO2"],
    correctAnswer: "H2O",
  },
];

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Disable next button initially
nextButton.disabled = true;

// Function to display the current question
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButtons.innerHTML = ""; // Clear previous answer buttons

  // Create answer buttons
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add(
      "cursor-pointer",
      "border",
      "border-gray-400",
      "py-2.5",
      "px-5",
      "bg-white",
      "rounded-lg",
      "text-left",
      "w-full"
    );
    button.addEventListener("click", () => selectAnswer(option));
    answerButtons.appendChild(button);
  });
}

// Function to handle answer selection
function selectAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  // Change button color based on correct/incorrect answer
  answerButtons.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent === currentQuestion.correctAnswer) {
      btn.classList.add("bg-green-400");
    } else {
      if (btn.textContent === selectedOption) {
        btn.classList.add("bg-red-400");
      }
    }
  });

  // Disable answer buttons after selection
  answerButtons.querySelectorAll("button").forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("cursor-not-allowed");
  });

  // Update score if answer is correct
  if (isCorrect) {
    score++;
  }
}

// Function to move to the next question
function handleNextButton() {
  currentQuestionIndex++;

  // Clear answer buttons
  answerButtons.innerHTML = "";

  // If there are more questions, show next question
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
    // Disable next button after showing the next question
    nextButton.disabled = true;
  } else {
    // Quiz finished, display score or perform any other action
    questionElement.textContent = `Quiz finished. Your score: ${score} out of ${quizQuestions.length}`;
    nextButton.disabled = true;
    nextButton.innerHTML = "Play again";
  }
}

// Event listener for the Next button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quizQuestions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz
startQuiz();
