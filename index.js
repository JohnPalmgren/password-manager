const addbtn = document.getElementById("add");
const backdrop = document.querySelector(".background");
const passwordModal = document.querySelector(".pword-add");
const passwordModalCancelBtn = document.querySelector(
  ".pword-add button:last-of-type"
);
const eye = document.querySelector(".fa-eye");
const eyeSlash = document.querySelector(".fa-eye-slash");
const passwordEl = document.getElementById("password");
const input = document.querySelectorAll(".pword-add input");
const submit = document.querySelector(".pword-add button[type='submit");
const generatorBtn = document.querySelector(".generator-btn");
const generatorModel = document.getElementById("pword-generator");
const generatorCancel = document.querySelector(
  "#button-container button:last-of-type"
);
const generatorConfirm = document.querySelector(
  "#button-container button:first-of-type"
);

/** Remove hidden property on password modal. */
const addPasswordHandler = () => {
  passwordModal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
};

/**Add hidden property on password modal and reset defaults. */
const removePasswordHandler = () => {
  passwordModal.classList.add("hidden");
  backdrop.classList.add("hidden");
  input.forEach((field) => (field.value = ""));
  submit.disabled = true;
};

/** Add hidden property to generator modal and reset defaults. */
const removeGeneratorHandler = () => {
  const form = generatorModel.querySelector("form");
  form.reset();
  generatorModel.classList.add("hidden");
  passwordModal.removeEventListener("click", removeGeneratorHandler);
};

/** Remove any displayed modals and hide backdrop. */
const backdropHandler = () => {
  removePasswordHandler();
  removeGeneratorHandler();
  backdrop.classList.add("hidden");
};

/**
 * Toggle the eye or eye-slash icon and toggle
 * visibility of the password in password modal.
 */
const passwordVisibilityHandler = () => {
  if (passwordEl.type === "password") {
    eye.classList.add("hidden");
    eyeSlash.classList.remove("hidden");
    passwordEl.type = "text";
  } else {
    eye.classList.remove("hidden");
    eyeSlash.classList.add("hidden");
    passwordEl.type = "password";
  }
};

/** Enable add button in password modal when all fields have an input */
const enableAddButtonHandler = () => {
  let enableButton = true;
  input.forEach((field) => {
    if (!field.value) {
      enableButton = false;
    }
  });
  if (enableButton) {
    submit.disabled = false;
  }
};

/**
 * Add a row to the table using the input values from the password
 * modal as cell values. Generate a random string as an id for the
 * new elements. Add event listeners to newly generated buttons.
 */
const addTableRow = () => {
  event.preventDefault();
  const title = input[0].value;
  const username = input[1].value;
  const password = input[2].value;
  const table = document.querySelector("table");
  const randomString = "id" + Math.floor(Date.now() * Math.random()).toString();
  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerText = title;
  cell2.innerText = username;
  cell3.innerHTML = `
        <td>
            <div id="td-wrapper" class="${randomString}">
                <span class="hidden text-password">${password}</span>
                <span class="hidden-password">********</span>
                <input class="hidden password-input-box" value="${password}">
                <i class="fas fa-eye table-eye"></i>
                <i class="hidden fas fa-eye-slash table-slash"></i>
            </div>
            <button id="copy">Copy Password</button>
        </td>
    `;
  const eye = document.querySelector(".table-eye");
  const eyeSlash = document.querySelector(".table-slash");
  const copyBtn = document.getElementById("copy");
  eye.addEventListener("click", revealPasswordHandler.bind(self, randomString));
  eyeSlash.addEventListener(
    "click",
    revealPasswordHandler.bind(self, randomString)
  );
  copyBtn.addEventListener(
    "click",
    copyPasswordHandler.bind(self, randomString)
  );
  removePasswordHandler();
};

/**
 * Toggle password visibility of password in the table.
 * @param {string} id class name for target element.
 */
const revealPasswordHandler = (id) => {
  const tdWrapper = document.querySelector("." + id);
  const eyeTable = tdWrapper.querySelector(".fa-eye");
  const eyeTableSlash = tdWrapper.querySelector(".fa-eye-slash");
  const revealed = tdWrapper.querySelector(".text-password");
  const hiddenPwrd = tdWrapper.querySelector(".hidden-password");
  if (revealed.classList.contains("hidden")) {
    revealed.classList.remove("hidden");
    hiddenPwrd.classList.add("hidden");
    eyeTable.classList.add("hidden");
    eyeTableSlash.classList.remove("hidden");
  } else {
    revealed.classList.add("hidden");
    hiddenPwrd.classList.remove("hidden");
    eyeTable.classList.remove("hidden");
    eyeTableSlash.classList.add("hidden");
  }
};

/**
 * Copy password to clipboard.
 * @param {string} id class name for target element.
 */
const copyPasswordHandler = (id) => {
  const tdWrapper = document.querySelector("." + id);
  const password = tdWrapper.querySelector(".password-input-box");
  password.classList.remove("hidden");
  password.select();
  password.setSelectionRange(0, 99999);
  document.execCommand("copy");
  password.classList.add("hidden");
};

/** Remove hidden property from generator modal */
const revealGenerator = (event) => {
  event.stopImmediatePropagation();
  generatorModel.classList.remove("hidden");
  passwordModal.addEventListener("click", removeGeneratorHandler);
};

/**
 * Returns randomly select an item from an array.
 * @param {array} list
 */
const randomItemFromArray = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

/**
 * Using characters and string length selected by the user generate a
 * random string where each character has an equal chance of being selected.
 * @returns {string} Randomly generated string.
 */
const generatorLogic = () => {
  const uppercaseBox = document.querySelector(
    "form input[type='checkbox']:first-of-type"
  );
  const lowercaseBox =
    uppercaseBox.parentElement.nextElementSibling.lastElementChild
      .previousElementSibling;
  const numberBox =
    lowercaseBox.parentElement.nextElementSibling.lastElementChild
      .previousElementSibling;
  const bracketBox =
    numberBox.parentElement.nextElementSibling.lastElementChild
      .previousElementSibling;
  const specialBox =
    bracketBox.parentElement.nextElementSibling.lastElementChild
      .previousElementSibling;
  const spaceBox =
    specialBox.parentElement.nextElementSibling.lastElementChild
      .previousElementSibling;
  const length = document.getElementById("length").value;

  const passwordList = [];
  const selectedFields = {};

  const uppercase = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const lowercase = Array.from("abcdefghijklmnopqrstuvwxyz");
  const number = Array.from("0123456789");
  const brackets = Array.from("<>[]{}()");
  const special = Array.from("!\"#$%&'*+,.\\/:;=?@^`|~-_");
  const space = [" "];

  let password = "";
  let totalCharacters = 0;

  if (uppercaseBox.checked) {
    totalCharacters += 26;
    selectedFields.uppercase = [totalCharacters, uppercase];
  }
  if (lowercaseBox.checked) {
    totalCharacters += 26;
    selectedFields.lowercase = [totalCharacters, lowercase];
  }
  if (numberBox.checked) {
    totalCharacters += 10;
    selectedFields.number = [totalCharacters, number];
  }
  if (bracketBox.checked) {
    totalCharacters += 8;
    selectedFields.brackets = [totalCharacters, brackets];
  }
  if (specialBox.checked) {
    totalCharacters += 24;
    selectedFields.special = [totalCharacters, special];
  }
  if (spaceBox.checked) {
    totalCharacters += 1;
    selectedFields.space = [totalCharacters, space];
  }

  for (let i = 0; i < length; i++) {
    const selector = Math.floor(Math.random() * totalCharacters + 1);
    for (const field in selectedFields) {
      if (selector <= selectedFields[field][0]) {
        passwordList.push(randomItemFromArray(selectedFields[field][1]));
        break;
      }
    }
  }
  for (const char of passwordList) {
    password += char;
  }
  return password;
};

/** Add generated password to password field in password modal. */
const generatePasswordHandler = () => {
  const password = generatorLogic();
  passwordEl.value = password;
  enableAddButtonHandler();
  removeGeneratorHandler();
};

addbtn.addEventListener("click", addPasswordHandler);
passwordModalCancelBtn.addEventListener("click", removePasswordHandler);
backdrop.addEventListener("click", backdropHandler);
eye.addEventListener("click", passwordVisibilityHandler);
eyeSlash.addEventListener("click", passwordVisibilityHandler);
input.forEach((field) => {
  field.addEventListener("keyup", enableAddButtonHandler);
});
submit.addEventListener("click", addTableRow);
generatorCancel.addEventListener("click", removeGeneratorHandler);
generatorConfirm.addEventListener("click", generatePasswordHandler);
generatorBtn.addEventListener("click", revealGenerator);
