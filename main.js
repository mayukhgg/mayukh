/* === TYPING EFFECT === */
const words = ["Web Developer", "Full Stack Developer", "Programmer", "Student"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingSpan = document.querySelector(".typing-text span");

function type() {
  const current = words[wordIndex];
  typingSpan.textContent = isDeleting
    ? current.substring(0, --charIndex)
    : current.substring(0, ++charIndex);

  if (!isDeleting && charIndex === current.length) isDeleting = true;
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 80 : 120);
}
type();

/* === CONTACT FORM BACKEND === */

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  try {
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      statusMsg.textContent = "✅ Message Sent!";
      form.reset();
    } else {
      statusMsg.textContent = "❌ Failed!";
    }
  } catch {
    statusMsg.textContent = "❌ Backend not running!";
  }
});
