// Express API for the portfolio: Charlybot chatbot (Claude) + contact form (email).

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Anthropic = require("@anthropic-ai/sdk");
const prompt = require("./prompt");

const app = express();
const PORT = process.env.PORT || 3000;
const email = process.env.MAIL;
const password = process.env.MAIL_PW;

app.use(cors());
app.use(express.json());

// Charlybot runs on Claude Haiku 4.5 — cheap and fast, ideal for a scoped Q&A bot.
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: { user: email, pass: password },
});

// ----- Chatbot: ask Charlybot a question -----
app.get("/api/ask", async (req, res) => {
  const question = req.query.q;
  if (!question) {
    return res.status(400).json("Please, write something.");
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      system: prompt, // the "Charlybot" persona (prompt.js)
      messages: [{ role: "user", content: String(question) }],
    });

    const answer = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    res.json(answer);
  } catch (error) {
    console.error("Charlybot error:", error);
    res.status(500).json("Error processing request");
  }
});

// ----- Contact form: send mail (and optional copy to the sender) -----
app.post("/api/form", async (req, res) => {
  const mailOptions = {
    from: email,
    to: email,
    subject: `New message from your portfolio from ${req.body.name}`,
    text: `Name: ${req.body.name}
           Email: ${req.body.email}
           Subject: ${req.body.select}
           Message: ${req.body.message}
           Checkbox: ${req.body.checkbox}`,
  };

  const mailRedirect = {
    from: email,
    to: req.body.email,
    subject: `Thank you for reaching out!`,
    text: `Hello ${req.body.name}, thanks for reaching out!
I've received your email and will get back to you as soon as possible. Enjoy your day!
Best regards, Carlo

Your message:
${req.body.message}

Your email:
${req.body.email}`,
    html: `
    <html lang="en">
  <head>
    <style>
      h2 { font-size: 1.1rem; font-weight: bold; }
      h3 { font-size: 0.8rem; font-style: italic; font-weight: bold; }
      p { font-size: 0.9rem; font-weight: regular; }
      .text-below { font-size: 0.7rem; }
      .img { height: 40px; width: 40px; }
    </style>
  </head>
  <body>
    <h2>Hello ${req.body.name}, thanks for reaching out!</h2>
    <p>I've received your email and will get back to you as soon as possible. Enjoy your day!</p>
    <p>Best regards, Carlo</p>
    <br />
    <img src="https://i.ibb.co/yBT69K7/carlo-1.png" alt="carlo-1" border="0">
    <br/><br/>
    <h3>Your email:</h3>
    <p class="text-below">${req.body.email}</p>
    <h3>Your message:</h3>
    <p class="text-below">${req.body.message}</p>
  </body>
</html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error, email not sent" });
    }
    console.log("Email sent: " + info.response);

    if (req.body.checkbox === true) {
      transporter.sendMail(mailRedirect, (redirectError, redirectInfo) => {
        if (redirectError) {
          console.error(redirectError);
          return res.status(500).json({ message: "Error, email not sent" });
        }
        console.log("Copy sent: " + redirectInfo.response);
        res.json({ message: "Success, emails sent!" });
      });
    } else {
      res.json({ message: "Success, email sent!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
