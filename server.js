require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// POST route to handle form submission
app.post("/send-email", async (req, res) => {
    const { name, surname, email } = req.body;

    // Configure email sender (Use a real SMTP email account)
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.PASSWORD, // Your email password
        },
    });

    // Email content
    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL, // Send email to yourself
        subject: "New User Signup",
        text: `New user signed up:\n\nName: ${name}\nSurname: ${surname}\nEmail: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});