// Handles the "free quote" funnel: opening/closing the modal and
// submitting the form to Formspree without leaving the page.

const modal = document.getElementById("quote-modal");
const openButtons = document.querySelectorAll("[data-open-quote]");
const closeButtons = document.querySelectorAll("[data-close-quote]");
const form = document.getElementById("quote-form");
const status = document.getElementById("form-status");

function openModal() {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const firstField = document.getElementById("name");
  if (firstField) firstField.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

openButtons.forEach((btn) => btn.addEventListener("click", openModal));
closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));

// Click on the dark overlay (outside the modal box) also closes it.
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

// Escape key closes it too.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

// Submit the form in the background via fetch so the page never
// reloads and the visitor sees an instant confirmation message.
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  status.textContent = "Sending...";
  status.className = "form-status";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = "Thanks! We'll be in touch shortly with your free quote.";
      status.className = "form-status success";
      form.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (err) {
    status.textContent =
      "Something went wrong sending that. Please call or email us directly.";
    status.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
  }
});
