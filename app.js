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
let passwordValidated = false;
let confirmPasswordValidated = false;
let readyToValidConfirmPassword = false;
const validIcon = `
  <svg aria-hidden="true" focusable="false" data-prefix="fas"
  class="svg-inline--fa fa-check-circle fa-w-16 form-group-input-icon valid" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path fill="currentColor"
    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
  </path>
  </svg>`;
const invalidIcon = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle"
class="svg-inline--fa fa-exclamation-circle fa-w-16 form-group-input-icon invalid" role="img"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path fill="currentColor"
  d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z">
</path>
</svg>`;

/*
These are the Regex I need to check as the user types
*/
const upperRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*\d)/;
const lengthRegex = /[a-zA-Z\d]{8,}$/;

const validatePassword = function () {
  // Get user input
  let userInput = password.value;
  // Validate against each regex and update styles accordingly
  if (userInput === "") {
    upper.classList.remove("valid");
    number.classList.remove("valid");
    length.classList.remove("valid");
    passwordValidated = false;
    toggleIcon("password");
  }
  // Make sure the user input contains at least 1 uppercase letter
  upperRegex.test(userInput)
    ? upper.classList.add("valid")
    : upper.classList.remove("valid");
  // Make sure the user input contains at least 1 number
  numberRegex.test(userInput)
    ? number.classList.add("valid")
    : number.classList.remove("valid");
  // Make sure the user input contains at least 8 characters
  lengthRegex.test(userInput)
    ? length.classList.add("valid")
    : length.classList.remove("valid");

  if (
    upperRegex.test(userInput) === false ||
    numberRegex.test(userInput) === false ||
    lengthRegex.test(userInput) === false
  ) {
    passwordValidated = false;
    password.classList.remove("valid");
    toggleIcon("password");
  }

  if (passwordValidated === false) {
    if (
      upperRegex.test(userInput) &&
      numberRegex.test(userInput) &&
      lengthRegex.test(userInput)
    ) {
      passwordValidated = true;
      password.classList.add("valid");
      toggleIcon("password");
    }
  }
};

const validateConfirmPassword = function () {
  let userInput = confirmPassword.value;
  if (userInput.length === password.value.length) {
    readyToValidConfirmPassword = true;
  }

  if (readyToValidConfirmPassword) {
    if (userInput === password.value) {
      confirmPasswordValidated = true;
      confirmPassword.classList.remove("invalid");
      validationMessage.classList.remove("invalid");
      validationMessage.classList.add("valid");
      confirmPassword.classList.add("valid");
      validationMessage.textContent = "Passwords Match";
      toggleIcon("confirmPassword");
    } else {
      confirmPasswordValidated = false;
      validationMessage.classList.remove("valid");
      confirmPassword.classList.remove("valid");
      validationMessage.classList.add("invalid");
      confirmPassword.classList.add("invalid");
      validationMessage.textContent = "Passwords Do Not Match";
      toggleIcon("confirmPassword");
    }
  }
};

const toggleIcon = function (element) {
  /**
   * TODO: Figure out why I'm getting a console error for this
   */
  if (element === "password") {
    if (passwordValidated === true) {
      password.parentNode.insertAdjacentHTML("beforeend", validIcon);
    } else {
      let validIconSelector = document.querySelector('.form-group-input-icon.valid');
      if (validIconSelector) {
        validIconSelector.remove();
      }
    }
  }
  if (element === "confirmPassword") {
    let validIconSelector = document.querySelector('[data-name="confirm-password"] + .form-group-input-icon.valid')
    let invalidIconSelector = document.querySelector('[data-name="confirm-password"] + .form-group-input-icon.invalid')
    if (confirmPasswordValidated === true) {
      if (!validIconSelector) {
        if (invalidIconSelector) {
          invalidIconSelector.remove();
        }
        confirmPassword.parentNode.insertAdjacentHTML("beforeend", validIcon);
      }
    } else {
      if (!invalidIconSelector) {
        if (validIconSelector) {
          validIconSelector.remove();
        }
        confirmPassword.parentNode.insertAdjacentHTML("beforeend", invalidIcon);
      }
      // confirmPassword.parentNode.removeChild(parent.children[2]);
      // confirmPassword.insertAdjacentHTML("afterend", invalidIcon);
    }
  }
};

const validateInputs = function (e) {
  // Show success message if input passes all tests
  e.preventDefault();
  if (passwordValidated === true && confirmPasswordValidated === true) {
    form.insertAdjacentHTML("afterbegin", successMessage);
  }
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
form.addEventListener("submit", validateInputs);
