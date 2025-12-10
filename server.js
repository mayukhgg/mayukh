const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let messages = []; // stores all messages

// ✅ HOME TEST
app.get("/", (req, res) => {
  res.send("✅ Backend Running!");
});


// ✅ CONTACT FORM API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false });
  }

  const data = {
    name,
    email,
    message,
    time: new Date().toLocaleString()
  };

  messages.push(data);

  // ✅ EMAIL SETUP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",       // 🔴 CHANGE THIS
      pass: "YOUR_APP_PASSWORD"           // 🔴 CHANGE THIS
    }
  });

  const mailOptions = {
    from: email,
    to: "YOUR_EMAIL@gmail.com",           // 🔴 CHANGE THIS
    subject: "📩 New Portfolio Message",
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});


// ✅ VIEW MESSAGES IN BROWSER
app.get("/messages", (req, res) => {
  res.json(messages);
});


// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Server running on port", PORT));

