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
    }else if (window.location.href.includes("dashboard.html")) {

        setTimeout( () => {
            toggleChat();
            chatApollo("dashboard")}, 1000);
    }
}

let timeLeft = 10;
// variable to store interval
let timeInterval = null;

function startTimer() {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    // reseting the timer
    timeLeft = 10;

    document.getElementById("timer").textContent = timeLeft;

    // seting interval
    timeInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            alert("Time's up!");
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuestions.length) {
        loadQuestions();
    } else {
        // Optional: you can show result here if quiz is finished
        console.log("Quiz finished");
    }
}






let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");

async function fetchQuestionsFromDB() {
    try {
        const response = await fetch(`http://localhost:3000/getQuestions`);
        const data = await response.json();

        activeQuestions = data.map(q => ({
            question: q.question_text,
            options: q.options,
            correctAnswer: q.correct_answer
        }));

        if (activeQuestions.length > 0) {
            console.log('Loaded questions from DB:', activeQuestions);
            loadQuestions();
        } else {
            console.log('No questions found in the database.');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}



function loadQuestions() {
    nextButton.disabled = true;
    optionsContainer.innerHTML = ""; // Clear previous content

    if (currentQuestionIndex === 0) {
        // Only create the "Start the Quiz" button if it's the first question
        let startButton = document.createElement("button");
        startButton.textContent = "Start the Quiz";
        startButton.classList.add("start-button");

        startButton.addEventListener("click", () => {
            optionsContainer.innerHTML = ""; // Remove the start button
            displayQuestion();
            startTimer();
        });

        optionsContainer.appendChild(startButton);
    } else {
        // If the quiz has started, load the question directly
        displayQuestion();
    }
}

// Function to display questions after clicking "Start the Quiz"
function displayQuestion() {
    let currentQuestion = activeQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear options before displaying new ones

    currentQuestion.options.forEach((option) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => {
            selectQuestion(button, currentQuestion.correctAnswer);
        });
        optionsContainer.appendChild(button);
    });
    startTimer();
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
    if (currentQuestionIndex < activeQuestions.length) {
        loadQuestions();
    }else {

        clearInterval(timeInterval);


        billboardDisplay(score);

        setTimeout(() => {

            chatApollo(score);
        }, 2000);

    }
})

fetchQuestionsFromDB();

userDataBase = [

    {
    username: "Alex_PostSQL_destroyer",
    title: "Present Continuous annihilator",
    score: 4
    },
    {
        username: "Oleg_lethal_clicker",
        title: "Past Perfect Nemesis",
        score: 1
    },
    {
        username: "Bagira_From_Slovakia",
        title: "Overlord of Future Simple",
        score: 2
    }

];

function billboardDisplay(score) {
    optionsContainer.innerHTML = "";
    const billboard = document.createElement("div");
    billboard.classList.add("leadershipBoard");
    questionText.appendChild(billboard);

    nextButton.style.display = "none";

    let user = {
        username: "You",
        title: "A1 galactic gladiator",
        score: score
    }
    userDataBase.push(user);


    // Leaderboard title
    const leaderboardTitle = document.createElement("h3");
    leaderboardTitle.textContent = "Warbattlefield 🏆";
    leaderboardTitle.style.backgroundColor = "rgba(4,31,78,0.9)";
    leaderboardTitle.style.color = "#ffffff";
    leaderboardTitle.style.padding = "5px";
    leaderboardTitle.style.borderRadius = "5px";
    billboard.appendChild(leaderboardTitle);

    // Create the leaderboard container (grid!)
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.style.display = "grid";
    leaderboardContainer.style.gridTemplateColumns = "1fr 2fr 1fr"; // Username, Title, Score
    leaderboardContainer.style.gap = "10px";
    leaderboardContainer.style.textAlign = "left";

    // Add header row
    ["Username", "Title", "Score"].forEach(header => {
        const headerItem = document.createElement("div");
        headerItem.style.fontWeight = "bold";
        headerItem.style.backgroundColor = "#FFFFFF33";
        headerItem.style.padding = "5px";
        headerItem.style.borderRadius = "5px";
        headerItem.style.textTransform = "uppercase";
        headerItem.style.textAlign = "center";
        headerItem.style.fontSize = "16px";
        headerItem.style.color = "#ffffff";

        headerItem.textContent = header;
        leaderboardContainer.appendChild(headerItem);
    });

    // Sort users by score descending
    const sortedUsers = userDataBase.sort((a, b) => b.score - a.score);

    sortedUsers.forEach((user, index) => {
        const bgColor = index % 2 === 0 ? "#0089f3" : "#005f99"; // alternates

        const usernameDiv = document.createElement("div");
        usernameDiv.textContent = user.username;
        usernameDiv.style.backgroundColor = bgColor;
        usernameDiv.style.padding = "5px";
        usernameDiv.style.borderRadius = "5px";
        usernameDiv.style.color = "white";
        usernameDiv.style.textAlign = "center";

        const titleDiv = document.createElement("div");
        titleDiv.textContent = user.title;
        titleDiv.style.backgroundColor = bgColor;
        titleDiv.style.padding = "5px";
        titleDiv.style.borderRadius = "5px";
        titleDiv.style.color = "white";
        titleDiv.style.textAlign = "center";

        const scoreDiv = document.createElement("div");
        scoreDiv.textContent = user.score;
        scoreDiv.style.backgroundColor = bgColor;
        scoreDiv.style.padding = "5px";
        scoreDiv.style.borderRadius = "5px";
        scoreDiv.style.color = "white";
        scoreDiv.style.textAlign = "center";

        if (user.username === "You") {
            usernameDiv.style.backgroundColor = "#ab58ef"; // gold
            titleDiv.style.backgroundColor = "#ab58ef";
            scoreDiv.style.backgroundColor = "#ab58ef";
            usernameDiv.style.color = "#000";
            titleDiv.style.color = "#000";
            scoreDiv.style.color = "#000";
        }


        leaderboardContainer.appendChild(usernameDiv);
        leaderboardContainer.appendChild(titleDiv);
        leaderboardContainer.appendChild(scoreDiv);
    });

    // made for slide button and like, dislike buttons
    const actionContainer = document.createElement("div");
    actionContainer.style.display = "flex";
    actionContainer.style.justifyContent = "space-between";
    actionContainer.style.alignItems = "center";
    actionContainer.style.width = "100%";
    actionContainer.style.marginTop = "20px";


    const retryButton = document.createElement("button");
    retryButton.classList.add("retryButton");
    retryButton.textContent = "Slide";

    retryButton.addEventListener("click", () => {
        if (activeQuestions === questions) {
            activeQuestions = funnyQuestions;
        } else if (activeQuestions === funnyQuestions) {
            activeQuestions = absurdLifeQuestions;
        } else {
            activeQuestions = questions; // loop back
        }
        currentQuestionIndex = 0;
        score = 0;

        clearInterval(timeInterval); // Stop old timer if exists
        nextButton.disabled = true;
        billboard.remove();
        loadQuestions();
        nextButton.style.display = "block";
        nextButton.style.justifySelf = "center";
    })

    const likeButton = document.createElement("p");
    likeButton.classList.add("likeButton");
    likeButton.textContent = "👍 0";

    const dislikeButton = document.createElement("p");
    dislikeButton.classList.add("dislikeButton");
    dislikeButton.textContent = "👎 0";


    actionContainer.appendChild(likeButton);
    actionContainer.appendChild(retryButton);
    actionContainer.appendChild(dislikeButton);

    likeButton.addEventListener("click", () => {
        likeCount++;
        likeButton.textContent = `👍 ${likeCount}`;
        likeButton.style.transform = "scale(1.2)";
        setTimeout(() => likeButton.style.transform = "scale(1)", 150);
        likeButton.disabled = true;
        dislikeButton.disabled = true;
    });

    dislikeButton.addEventListener("click", () => {
        dislikeCount++;
        dislikeButton.textContent = `👎 ${dislikeCount}`;
        dislikeButton.style.transform = "scale(1.2)";
        setTimeout(() => dislikeButton.style.transform = "scale(1)", 150);
        likeButton.disabled = true;
        dislikeButton.disabled = true;
    });


    billboard.appendChild(leaderboardContainer);
    billboard.appendChild(actionContainer);
}




let likeCount = 0;
let dislikeCount = 0;




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

            const highScore = 4;
            const goodUser = userDataBase.find(user => user.score === highScore);

            const targetScore = 2;
            // Find user with score 3
            const user = userDataBase.find(user => user.score === targetScore);
            apolloMessage.textContent = `You beat ${user.username}! but you didn't beat ${goodUser.username}, try again while he is busy finding out what is LEFT JOIN in PostSQL `;
        }
    }else if (usersMessage.toLowerCase().includes("dashboard")) {
        apolloMessage.textContent = "Here you can book the lessons with the tutor Ihor, please select the dates that are convenient for you";
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






