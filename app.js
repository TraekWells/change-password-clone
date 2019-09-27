/**
 * 1. Grab the elements needed to interact with
 * 2. Set my initial state (elementIsValid = false)
 * 3. Create regular expressions to change user input against
 * 4. Validate user input
 * 5. Update valid or invalid states
 * 6. Show success message if valid
 * 7. Celebrate
 */

const form = document.querySelector(".form");
const password = document.querySelector('input[data-name="password"]');
const confirmPassword = document.querySelector(
  'input[data-name="confirm-password"]'
);
const upper = document.getElementById("upper");
const number = document.getElementById("number");
const length = document.getElementById("length");

const validationMessage = document.querySelector(".form-validation-message");

/*
These are the Regex I need to check as the user types
*/
const upperRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*\d)/;
const lengthRegex = /[a-zA-Z\d]{8,}$/;
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const validatePassword = function() {
  // Get user input
  let userInput = password.value;
  // Validate against each regex and update styles accordingly
  if (userInput === "") {
    upper.classList.remove("valid");
    number.classList.remove("valid");
    length.classList.remove("valid");
  }
  upperRegex.test(userInput)
    ? upper.classList.add("valid")
    : upper.classList.remove("valid");

  numberRegex.test(userInput)
    ? number.classList.add("valid")
    : number.classList.remove("valid");

  lengthRegex.test(userInput)
    ? length.classList.add("valid")
    : length.classList.remove("valid");
};

const validateConfirmPassword = function() {
  let userInput = confirmPassword.value;
  if (userInput.length === password.value.length) {
    if (userInput === password.value) {
      displayMessage("Passwords Match", "valid");
    }
    if (!userInput === password.value) {
      displayMessage("Passwords Do Not Match", "invalid");
    }
  }
  console.log(userInput);
  console.log(password.value);
};

const displayMessage = function(msg, validationClass) {
  validationMessage.textContent = msg;
  validationMessage.style.display = "block";
  if (validationMessage.classList.length === 0) {
    validationMessage.classList.add(validationClass);
  } else if (validationMessage.classList.contains("valid")) {
    validationMessage.classList.replace("valid", validationClass);
  } else {
    validationMessage.classList.replace("invalid", validationClass);
  }
};

const validateInput = function() {
  // Get user input
  // Validate against each regex
  // Update styles accordingly
  // Update all regex
  // Show success message if input passes all tests
};

const successMessage = `
  <div class="form-success">
    <svg aria-hidden="true" focusable="false" data-prefix="fas"
      class="svg-inline--fa fa-check-circle fa-w-16 form-success-icon" role="img" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path fill="currentColor"
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
      </path>
    </svg>
    <h2>Password Updated!</h2>
    <p>Your password has been changed successfully!</p>
    <p>Use your new password to <a href="#" class="link">login</a></p>
  </div>
 `;

password.addEventListener("keyup", validatePassword);
confirmPassword.addEventListener("keyup", validateConfirmPassword);
form.addEventListener("submit", validateInput);
