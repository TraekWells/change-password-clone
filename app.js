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

// form.innerHTML = successMessage;
