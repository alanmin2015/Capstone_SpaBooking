const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createPool({
    host: 'wenbomin.ca',
    user: 'hekapmc2_Alan',
    password: 'Dm852833480',
    database: 'hekapmc2_Spa'
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            return res.status(500).send({message: 'An error occurred during the login process'});
        }
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    return res.status(500).send({message: 'An error occurred during the password validation'});
                }
                if (isMatch) {
                    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
                    return res.status(200).json({ token });
                } else {
                    return res.status(400).json({ message: 'Wrong password!' });
                }
            });
        } else {
            return res.status(400).json({ message: 'User not found!' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
