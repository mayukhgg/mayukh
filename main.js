/* ------ TYPING ANIMATION ------ */
const words = ["Web Developer", "Full Stack Developer", "Programmer", "Student"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpan = document.querySelector(".typing-text span");

function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex++);
    } else {
        typingSpan.textContent = currentWord.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 80 : 120);
}
type();

/* ------ MENU ------ */
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    nav.classList.toggle("show");
    menuBtn.innerHTML = menuOpen 
        ? '<i class="fa-solid fa-bars"></i>' 
        : '<i class="fa-solid fa-xmark"></i>';
    menuOpen = !menuOpen;
});

/* ------ BACKEND CONTACT FORM ------ */

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const res = await fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json();

            if (data.success) {
                statusMsg.textContent = "✅ Message Sent!";
                form.reset();
            } else {
                statusMsg.textContent = "❌ Failed!";
            }

        } catch (err) {
            statusMsg.textContent = "❌ Backend Not Running!";
        }
    });
}
