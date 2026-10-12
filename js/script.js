/* Validación accesible del formulario de demostración. */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formContacto");
  if (!form) return;

  const feedback = document.querySelector("#formFeedback");
  const fields = [
    { input: document.querySelector("#nombre"), valid: value => value.trim().length >= 3 },
    { input: document.querySelector("#correo"), valid: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
    { input: document.querySelector("#interes"), valid: value => value !== "" },
    { input: document.querySelector("#mensaje"), valid: value => value.trim().length >= 10 },
    { input: document.querySelector("#privacidad"), valid: value => value === true }
  ];

  function validateField(field) {
    const value = field.input.type === "checkbox" ? field.input.checked : field.input.value;
    const isValid = field.valid(value);
    field.input.classList.toggle("is-invalid", !isValid);
    field.input.classList.toggle("is-valid", isValid);
    field.input.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  fields.forEach(field => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
      if (field.input.classList.contains("is-invalid") || field.input.classList.contains("is-valid")) {
        validateField(field);
      }
    });
    field.input.addEventListener("change", () => validateField(field));
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);
    feedback.className = "";
    if (!allValid) {
      feedback.textContent = "Revisa los campos marcados. Corrige los datos indicados antes de continuar.";
      feedback.classList.add("error");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    feedback.textContent = "¡Gracias! La información del formulario es válida. En esta demostración no se enviaron datos a ningún servidor.";
    feedback.classList.add("success");
    feedback.focus();
    form.reset();
    fields.forEach(field => {
      field.input.classList.remove("is-valid", "is-invalid");
      field.input.removeAttribute("aria-invalid");
    });
  });
});
