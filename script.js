const themeToggle = document.getElementById("themeToggle");
const secretButton = document.getElementById("secretButton");
const secretBox = document.getElementById("secretBox");
const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

function toggleSecretBox() {
  secretBox.classList.toggle("show");
}

secretButton.addEventListener("click", toggleSecretBox);

window.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "s") {
    toggleSecretBox();
  }
});


});

console.log("%cSXO Lab secret loaded ♡", "color:#ff9ee8; font-size:16px; font-family:monospace;");
console.log("%cPress Shift + S for a hidden transmission.", "color:#61efff; font-size:13px; font-family:monospace;");
