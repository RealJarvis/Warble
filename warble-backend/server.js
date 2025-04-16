const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'warbletests',
    password: '5823',
    port: 5432,
});

app.post('/createTest', async (req, res) => {
    const { testName, testType, englishLevel } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tests (test_name, type, level) VALUES ($1, $2, $3) RETURNING *',
            [testName, testType, englishLevel]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/saveQuestions', async (req, res) => {
    const { testId, questions } = req.body;

    try {
        const insertPromises = questions.map(q => {
            return pool.query(
                'INSERT INTO questions (test_id, question_text, options, correct_answer) VALUES ($1, $2, $3, $4)',
                [testId, q.question, JSON.stringify(q.options), q.correctAnswer]
            );
        });

        await Promise.all(insertPromises);

        res.status(200).send('Questions saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/getQuestions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});





app.listen(3000, () => console.log('Server running on http://localhost:3000'));
