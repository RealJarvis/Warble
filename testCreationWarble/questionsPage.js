function addQuestion() {
    const container = document.getElementById('questions-container');
    const block = document.createElement('div');
    block.classList.add('question-block');
    block.innerHTML = `
        <input type="text" placeholder="Enter question" class="question-input" />
        <input type="text" placeholder="Option 1" class="option-input" />
        <input type="text" placeholder="Option 2" class="option-input" />
        <input type="text" placeholder="Option 3" class="option-input" />
        <input type="text" placeholder="Correct answer" class="correct-answer-input" />
    `;
    container.appendChild(block);
}

function saveQuestions() {
    const questionBlocks = document.querySelectorAll('.question-block');
    const questions = [];

    questionBlocks.forEach(block => {
        const questionText = block.querySelector('.question-input').value;
        const options = Array.from(block.querySelectorAll('.option-input')).map(input => input.value);
        const correctAnswer = block.querySelector('.correct-answer-input').value;

        questions.push({
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    });

    console.log('Questions:', questions);
    alert('Questions saved!');

    // Here you can send to server (backend)
    fetch('http://localhost:3000/saveQuestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}
