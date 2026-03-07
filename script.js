document.addEventListener("DOMContentLoaded", () => {
  console.log("SXO Lab JS loaded ✦");

  const themeToggle = document.getElementById("themeToggle");
  const secretButton = document.getElementById("secretButton");
  const secretBox = document.getElementById("secretBox");
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");
  const brand = document.querySelector(".brand");

  let tapCount = 0;
  let tapTimer = null;

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

    if (toast.hideTimer) {
      clearTimeout(toast.hideTimer);
    }

    toast.hideTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  function toggleSecretBox(message = "Secret transmission unlocked ✦") {
    if (!secretBox) {
      console.warn("secretBox not found");
      return;
    }

    secretBox.classList.toggle("show");
    showToast(message);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      showToast("Mode shifted ♡");
      console.log("Theme toggled");
    });
  } else {
    console.warn("themeToggle not found");
  }

  if (secretButton) {
    secretButton.addEventListener("click", () => {
      toggleSecretBox("Star orb activated ✦");
      console.log("Secret button triggered ✦");
    });
  } else {
    console.warn("secretButton not found");
  }

  if (brand) {
    brand.addEventListener("click", () => {
      tapCount += 1;

      if (tapTimer) {
        clearTimeout(tapTimer);
      }

      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 700);

      if (tapCount === 3) {
        toggleSecretBox("Triple tap secret triggered ♡");
        tapCount = 0;
        console.log("Triple tap secret triggered ♡");
      }
    });
  } else {
    console.warn(".brand not found");
  }

  document.addEventListener("keydown", (event) => {
    const key = (event.key || "").toLowerCase();
    const rawKey = event.key || "";

    if (event.shiftKey && key === "s") {
      event.preventDefault();
      toggleSecretBox("Shift + S secret triggered ✦");
      console.log("Shift + S secret shortcut triggered ✦");
    }

    const expected = konamiSequence[konamiIndex];
    const normalizedExpected =
      expected && expected.length === 1 ? expected.toLowerCase() : expected;
    const normalizedKey =
      rawKey.length === 1 ? rawKey.toLowerCase() : rawKey;

    if (normalizedKey === normalizedExpected) {
      konamiIndex += 1;

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

      const action = contactForm.getAttribute("action");
      const nameInput = document.getElementById("name");
      const name = nameInput ? nameInput.value.trim() : "";
      const formData = new FormData(contactForm);

      if (!action || !action.startsWith("https://formspree.io/")) {
        console.error("Invalid or missing Formspree action URL");
        formResponse.textContent =
          "Form endpoint missing. Add your real Formspree action URL in the form.";
        showToast("Missing form endpoint ⚠");
        return;
      }

      formResponse.textContent = "Transmitting signal...";
      showToast("Transmitting signal...");

      try {
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        let result = null;

        try {
          result = await response.json();
        } catch (jsonError) {
          console.warn("Response was not JSON", jsonError);
        }

        console.log("Formspree response status:", response.status);
        console.log("Formspree response body:", result);

        if (response.ok) {
          formResponse.textContent = `✦ Signal received, ${name || "traveler"}. Transmission logged. I will get back to you soon.`;
          contactForm.reset();
          showToast("Inquiry transmitted successfully ♡");
        } else {
          const errorMessage =
            result &&
            result.errors &&
            Array.isArray(result.errors) &&
            result.errors.length > 0 &&
            result.errors[0].message
              ? result.errors[0].message
              : "Something glitched in the transmission. Please try again.";

          formResponse.textContent = errorMessage;
          showToast("Transmission error ⚠");
          console.error("Form submission failed:", errorMessage);
        }
      } catch (error) {
        console.error("Network or fetch error:", error);
        formResponse.textContent = "Network error. Please try again later.";
        showToast("Network distortion detected ⚠");
      }
    });
  } else {
    console.warn("contactForm or formResponse not found");
  }

  console.log("%cSXO Lab secret loaded ♡", "color:#ff9ee8; font-size:16px; font-family:monospace;");
  console.log("%cPress Shift + S for a hidden transmission.", "color:#61efff; font-size:13px; font-family:monospace;");
  console.log("%cTry the Konami-like sequence too.", "color:#baff71; font-size:13px; font-family:monospace;");
});
