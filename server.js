// ======================
// IMPORTS
// ======================
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

// ======================
// APP INIT
// ======================
const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("🎮 Gaming Portfolio Backend is Running");
});

// ======================
// SEND MAIL ROUTE
// ======================
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("❌ All fields are required");
  }

  try {
    // Gmail Transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "wwwanjalimishra80@gmail.com",      // YOUR GMAIL
        pass: "YOUR_APP_PASSWORD_HERE"            // GMAIL APP PASSWORD
      }
    });

    // Send Mail
    await transporter.sendMail({
      from: `"Gaming Portfolio 🎮" <wwwanjalimishra80@gmail.com>`,
      to: "wwwanjalimishra80@gmail.com",
      replyTo: email, // ✅ VERY IMPORTANT
      subject: "New Message from Gaming Portfolio 🎯",
      text: `
New Gamer Message 🎮

Name: ${name}
Sender Email: ${email}

Message:
${message}
      `
    });

    res.status(200).send("✅ Message sent successfully");

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).send("❌ Failed to send message");
  }
});

// ======================
// START SERVER
// ======================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
