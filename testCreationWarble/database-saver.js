const createTestButton = document.querySelector('.create-test-btn');

createTestButton.addEventListener('click', async () => {
    const testName = document.querySelector('input').value;
    const testType = document.querySelectorAll('select')[0].value;
    const englishLevel = document.querySelectorAll('select')[1].value;


    try {
        const response = await fetch('http://localhost:3000/createTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ testName, testType, englishLevel })
        });

        const data = await response.json();
        console.log('Test created:', data);
        window.location.href = 'questionsPage.html';
    } catch (error) {
        console.error('Error creating test:', error);
        alert('Error creating test');
    }
});
