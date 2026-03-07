document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const secretButton = document.getElementById("secretButton");
  const secretBox = document.getElementById("secretBox");
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  function toggleSecretBox() {
    if (secretBox) {
      secretBox.classList.toggle("show");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }

  if (secretButton) {
    secretButton.addEventListener("click", toggleSecretBox);
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key ? event.key.toLowerCase() : "";
    const code = event.code || "";

    if ((event.shiftKey && key === "s") || (event.shiftKey && code === "KeyS")) {
      event.preventDefault();
      toggleSecretBox();
      console.log("Secret shortcut triggered ✦");
    }
  });

  if (contactForm && formResponse) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const name = nameInput ? nameInput.value.trim() : "";

      formResponse.textContent = `Signal received, ${name || "traveler"} ✦ I will get back to you soon.`;
      contactForm.reset();
    });
  }

  console.log("%cSXO Lab secret loaded ♡", "color:#ff9ee8; font-size:16px; font-family:monospace;");
  console.log("%cPress Shift + S for a hidden transmission.", "color:#61efff; font-size:13px; font-family:monospace;");
});
