document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const secretButton = document.getElementById("secretButton");
  const secretBox = document.getElementById("secretBox");
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");
  const brand = document.querySelector(".brand");

  let tapCount = 0;
  let tapTimer;

  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  let konamiIndex = 0;

  function showToast(message = "Secret transmission unlocked ✦") {
    let toast = document.getElementById("cyberToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cyberToast";
      toast.className = "cyber-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function toggleSecretBox(message = "Secret transmission unlocked ✦") {
    if (secretBox) {
      secretBox.classList.toggle("show");
      showToast(message);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      showToast("Mode shifted ♡");
    });
  }

  if (secretButton) {
    secretButton.addEventListener("click", () => {
      toggleSecretBox("Star orb activated ✦");
      console.log("Secret button triggered ✦");
    });
  }

  if (brand) {
    brand.addEventListener("click", () => {
      tapCount++;

      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 700);

      if (tapCount === 3) {
        toggleSecretBox("Triple tap secret triggered ♡");
        tapCount = 0;
        console.log("Triple tap secret triggered ♡");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key ? event.key.toLowerCase() : "";
    const rawKey = event.key || "";

    if ((event.shiftKey && key === "s")) {
      event.preventDefault();
      toggleSecretBox("Shift + S secret triggered ✦");
      console.log("Secret shortcut triggered ✦");
    }

    const expected = konamiSequence[konamiIndex];
    const normalizedExpected = expected.length === 1 ? expected.toLowerCase() : expected;
    const normalizedKey = rawKey.length === 1 ? rawKey.toLowerCase() : rawKey;

    if (normalizedKey === normalizedExpected) {
      konamiIndex++;

      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        document.body.classList.add("konami-mode");
        toggleSecretBox("Konami signal accepted ♡");
        showToast("Konami mode activated ♡");

        setTimeout(() => {
          document.body.classList.remove("konami-mode");
        }, 4000);

        console.log("Konami-like secret triggered ♡");
      }
    } else {
      konamiIndex = 0;
    }
  });

  if (contactForm && formResponse) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const name = nameInput ? nameInput.value.trim() : "";
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          formResponse.textContent = `✦ Signal received, ${name || "traveler"}. Transmission logged. I will get back to you soon.`;
          contactForm.reset();
          showToast("Inquiry transmitted successfully ♡");
        } else {
          formResponse.textContent = "Something glitched in the transmission. Please try again.";
          showToast("Transmission error ⚠");
        }
      } catch (error) {
        formResponse.textContent = "Network error. Please try again later.";
        showToast("Network distortion detected ⚠");
      }
    });
  }

  console.log("%cSXO Lab secret loaded ♡", "color:#ff9ee8; font-size:16px; font-family:monospace;");
  console.log("%cPress Shift + S for a hidden transmission.", "color:#61efff; font-size:13px; font-family:monospace;");
  console.log("%cTry the Konami-like sequence too.", "color:#baff71; font-size:13px; font-family:monospace;");
});
