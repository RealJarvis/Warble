window.onload = function() {
    console.log(window.location.href);
    if (window.location.href.includes("createTest.html")) {

        setTimeout( () => {
            toggleChat();
            chatApollo("createMessage")}, 1000);
    }else if (window.location.href.includes("Test.html")) {

        setTimeout( () => {
            toggleChat();
            chatApollo("quizMessage")}, 1000);
    }
}


function toggleDarkMode() {
    document.body.style.backgroundColor = "#cce0ff";
    document.body.style.color = "black";

    //document.getElementsByClassName("card").style.backgroundColor = "white";


    let header = document.querySelector("header");
    header.style.backgroundColor = "#99c2ff";

    header.style.color = "black";
    header.querySelectorAll("h1, a, nav, ul, li").forEach(el => {el.style.color = "black"});
}


const questions = [
    {
        question: "She usually ______ coffee in the mornings, but today she _____ tea.",
        options: ["drinks / drinks", "drinks / is drinking", " is drinking / drinks"],
        correctAnswer: "drinks / is drinking",
    },
    {
        question: " I ______ why John ________ quiet today; he's usually very talkative.",
        options: ["(wonder / is being)", "(am wondering / is)", "(wonder / is)"],
        correctAnswer: "(am wondering / is)",
    },
    {
        question: " Look! Everyone _______ to solve the puzzle, but no one _______ the answer yet.",
        options: ["(tries / is knowing)", "(is trying / knows)", "(tries / is knowing)"],
        correctAnswer: " (am trying / is)",
    },
    {
        question: "Normally, our teacher ______ extra homework, but this week she ______ us extra tasks daily.",
        options: ["(doesn't give / is giving)", "(isn't giving / gives)", "(doesn't give / gives)"],
        correctAnswer: "(doesn't give / is giving)",
    },
    {
        question: "What _____ you ______ about right now? You ______ rarely quiet.",
        options: ["(do think / are being)", "(think / are being)", "(are thinking / are)"],
        correctAnswer: "(are thinking / are)",
    }
];


let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");

function loadQuestions() {
   nextButton.disabled = true;
   // inheriting the slot for question
    optionsContainer.innerText = "";
    // displays the current text
    let currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;
    currentQuestion.options.forEach((option) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => {selectQuestion(button, currentQuestion.correctAnswer);});
        optionsContainer.appendChild(button);
    })
}

function selectQuestion(button, correctAnswer) {
    const option = document.querySelectorAll(".option");
    option.forEach(opt => opt.disabled = true);

    if (button.textContent === correctAnswer) {
        button.classList.add("correct");
        score++;
    }else{
        button.classList.add("wrong");
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestions();
    }else {
        questionText.textContent = "Quiz finished!";
        optionsContainer.innerText = "";
        nextButton.style.display = "none";
        scoreText.textContent = `Your score: ${score} / ${questions.length}`;
        setTimeout(() => {
            
            chatApollo(score);
        }, 2000);

    }
})

loadQuestions();

function toggleChat() {
   let chatPopup = document.getElementById("chatPopup");
   if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
       chatPopup.style.display = "block";
   }else {
       chatPopup.style.display = "none";
   }
}

function sendMessage() {

        let message = document.getElementById("chatMessage").value;
        // preventing sending an empty message
        if (message === "") {
            return
        }
        console.log("Message detected --> " + message);

        let chatDisplay = document.querySelector(".chatDisplay");
        let newMessage = document.createElement("div");
        newMessage.classList.add("user-message");

        newMessage.textContent = message; // set the text

        chatDisplay.appendChild(newMessage);

        document.getElementById("chatMessage").value = "";
        autoScroll();

        setTimeout(() => {
            chatApollo(message)
        }, 1000);


}

function chatApollo(usersMessage) {
    let chatDisplay = document.querySelector(".chatDisplay");

    let apolloMessage = document.createElement("div");
    apolloMessage.classList.add("apollo-message");

    soundofMessage();

    if (typeof usersMessage === "number") {
        console.log(usersMessage);
        usersMessage = Number(usersMessage);
        if (usersMessage < 3) {
            apolloMessage.textContent = "I don't mean to offend, but someone is as dumb as a goat🙂";
        }else if (usersMessage >= 3) {
            apolloMessage.textContent = "You should work in NASA😎";
        }
    }
    else if (usersMessage.toLowerCase().includes("createmessage")) {
        apolloMessage.textContent = "I can help you creating your own test! Let me know if there is anything you need😉";
    } else if (usersMessage.toLowerCase().includes("quizmessage")) {
        apolloMessage.textContent = "This quiz is made for B2 level speakers, so pay attention🙂";
    }

    else if (usersMessage.toLowerCase().includes("hello")) {
        apolloMessage.textContent = "Hello, how can I help you?";
    }else if (usersMessage.toLowerCase().includes("light mode")) {
        apolloMessage.textContent = "Unfortunately light mode is not available:(";
        //toggleDarkMode();
    }else if (usersMessage.toLowerCase().includes("tests")) {
        apolloMessage.textContent = "Brace yourself, we are going to English tests🫡";
        setTimeout(() => {
            window.location.href = "Test.html";
        }, 4000);

    }else if (usersMessage.toLowerCase().includes("what can you do?")) {
        apolloMessage.textContent = "Well, not that much for now🤕";
    }else if (usersMessage.toLowerCase().includes("thank")) {
        apolloMessage.textContent = "I'm always here to give you compliments🫡";
    }
    else if (usersMessage.toLowerCase().includes("your name")) {
        apolloMessage.textContent = "My name is Apollo, I am your personal tutor, and will guide you on the way of developing your English skills🫡";
    }else if (usersMessage.toLowerCase().includes("how are you")) {
        apolloMessage.textContent = "I am doing just great!";
    }
    else {
        apolloMessage.textContent = "I don't know how to reply to this message😭";

    }
    chatDisplay.appendChild(apolloMessage);
    autoScroll();

}
// Function to force scrolling to the bottom
function autoScroll() {
    let chatBody = document.querySelector(".chat-body");
    chatBody.scrollTop = chatBody.scrollHeight;

}

function soundofMessage() {
    let audio = new Audio("messsound.wav");
    audio.play();
}



