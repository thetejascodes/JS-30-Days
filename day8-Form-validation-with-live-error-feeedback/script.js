const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passError = document.getElementById("password-error");
const confirmError = document.getElementById("confirm-password-error");
const strengthText = document.getElementById("strength-text");
const togglePassword = document.getElementById("toggle-password");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid = validateInputs();
  if (isValid) {
    successMessage.textContent = "✅ Form submitted successfully!";
    form.reset();
    clearBorders();
    strengthText.textContent = "";
  }
});

[nameInput, emailInput, passInput, confirmInput].forEach((input) =>
  input.addEventListener("input", validateInputs)
);

passInput.addEventListener("input", () => {
  checkPasswordStrength(passInput.value);
});

togglePassword.addEventListener("click", () => {
  passInput.type = passInput.type === "password" ? "text" : "password";
  confirmInput.type = confirmInput.type === "password" ? "text" : "password";
});

function validateInputs() {
  let valid = true;

  // Name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required";
    markInvalid(nameInput);
    valid = false;
  } else {
    nameError.textContent = "";
    markValid(nameInput);
  }

  // Email
  const email = emailInput.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email";
    markInvalid(emailInput);
    valid = false;
  } else {
    emailError.textContent = "";
    markValid(emailInput);
  }

  // Password
  if (passInput.value.length < 6) {
    passError.textContent = "Minimum 6 characters required";
    markInvalid(passInput);
    valid = false;
  } else {
    passError.textContent = "";
    markValid(passInput);
  }

  // Confirm Password
  if (confirmInput.value !== passInput.value || confirmInput.value === "") {
    confirmError.textContent = "Passwords do not match";
    markInvalid(confirmInput);
    valid = false;
  } else {
    confirmError.textContent = "";
    markValid(confirmInput);
  }

  return valid;
}

function checkPasswordStrength(password) {
  if (password.length < 6) {
    strengthText.textContent = "🔴 Weak Password";
    strengthText.style.color = "red";
  } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
    strengthText.textContent = "🟢 Strong Password";
    strengthText.style.color = "green";
  } else {
    strengthText.textContent = "🟡 Medium Password";
    strengthText.style.color = "orange";
  }
}

function markValid(input) {
  input.classList.remove("invalid");
  input.classList.add("valid");
}

function markInvalid(input) {
  input.classList.remove("valid");
  input.classList.add("invalid");
}

function clearBorders() {
  [nameInput, emailInput, passInput, confirmInput].forEach((input) => {
    input.classList.remove("valid", "invalid");
  });
}
