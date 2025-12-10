const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});

app.post("/contact", (req, res) => {
  const data = req.body;

  let messages = [];
  if (fs.existsSync("messages.json")) {
    messages = JSON.parse(fs.readFileSync("messages.json"));
  }

  messages.push({...data, date: new Date()});
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
