const lengthInput = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const passwordDisplay = document.getElementById("password-display");
const copyBtn = document.getElementById("copy");

const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?";

generateBtn.addEventListener("click", () => {
  let length = parseInt(lengthInput.value);
  let characters = "";
  if (uppercase.checked) characters += upperSet;
  if (lowercase.checked) characters += lowerSet;
  if (numbers.checked) characters += numberSet;
  if (symbols.checked) characters += symbolSet;

  if (!characters) {
    alert("Please select at least one option.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * characters.length);
    password += characters[rand];
  }

  passwordDisplay.textContent = password;
});

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  textarea.value = passwordDisplay.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});
