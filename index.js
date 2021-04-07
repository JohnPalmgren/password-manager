"use strict"
const addbtn = document.getElementById("add");
const backdrop = document.querySelector(".background");
const passwordModal = document.querySelector(".pword-add");
const passwordModalCancelBtn = document.querySelector(".pword-add button:last-of-type");
const eye = document.querySelector(".fa-eye");
const eyeSlash = document.querySelector(".fa-eye-slash")
const passwordEl = document.getElementById("password")
const input = document.querySelectorAll(".pword-add input")
const submit = document.querySelector(".pword-add button[type='submit");

const classIdTracker = []

const addPasswordHandler = () => {
    passwordModal.classList.remove("hidden");
    backdrop.classList.remove("hidden");
};

const removePasswordHandler = () => {
    passwordModal.classList.add("hidden");
    backdrop.classList.add("hidden");
    input.forEach(field => field.value = "")
    submit.disabled = true;
};

const backdropHandler = () => {
    removePasswordHandler();
};

const passwordVisibilityHandler = () => {
    if (passwordEl.type === "password") {
        eye.classList.add("hidden");
        eyeSlash.classList.remove("hidden");
        passwordEl.type="text";
    } else {
        eye.classList.remove("hidden");
        eyeSlash.classList.add("hidden");
        passwordEl.type="password";
    };
};

const enableAddButtonHandler = () => {
    let enableButton = true
    input.forEach(field => {
        if (!field.value) {
            enableButton = false;
        };
    });
    if (enableButton) {
        submit.disabled = false;
    };
};

// use index for class

const addTableRow = () => {
    event.preventDefault();
    const title = input[0].value;
    const username = input[1].value;
    const password = input[2].value;
    const table = document.querySelector("table");
    const randomString = "id" + Math.floor(Date.now()*Math.random()).toString()
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
                <i class="fas fa-eye table-eye"></i>
                <i class="hidden fas fa-eye-slash table-slash"></i>
            </div>
            <button id="copy">Copy Password</button>
        </td>
    `;
    const eye = document.querySelector(".table-eye")
    const eyeSlash = document.querySelector(".table-slash")
    eye.addEventListener("click", revealPasswordHandler.bind(self, randomString))
    eyeSlash.addEventListener("click", revealPasswordHandler.bind(self, randomString))
    classIdTracker.push(randomString);
    removePasswordHandler();
};

const revealPasswordHandler = (id) => {
    const tdWrapper = document.querySelector("."+id);
    const eyeTable = tdWrapper.querySelector(".fa-eye")
    const eyeTableSlash = tdWrapper.querySelector(".fa-eye-slash")
    const revealed = tdWrapper.querySelector(".text-password")
    const hiddenPwrd = tdWrapper.querySelector(".hidden-password")
    if (revealed.classList.contains("hidden")) {
        revealed.classList.remove("hidden");
        hiddenPwrd.classList.add("hidden")
        eyeTable.classList.add("hidden")
        eyeTableSlash.classList.remove("hidden");
    } else {
        revealed.classList.add("hidden");
        hiddenPwrd.classList.remove("hidden")
        eyeTable.classList.remove("hidden")
        eyeTableSlash.classList.add("hidden");
    }
};


addbtn.addEventListener("click", addPasswordHandler);
passwordModalCancelBtn.addEventListener("click", removePasswordHandler);
backdrop.addEventListener("click", backdropHandler);
eye.addEventListener("click", passwordVisibilityHandler);
eyeSlash.addEventListener("click", passwordVisibilityHandler);
input.forEach(field => {
    field.addEventListener("keyup", enableAddButtonHandler);
});
submit.addEventListener("click", addTableRow);
