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


const enableAddButton = () => {
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

addbtn.addEventListener("click", addPasswordHandler);
passwordModalCancelBtn.addEventListener("click", removePasswordHandler);
backdrop.addEventListener("click", backdropHandler);
eye.addEventListener("click", passwordVisibilityHandler);
eyeSlash.addEventListener("click", passwordVisibilityHandler);
input.forEach(field => {
    field.addEventListener("keyup", enableAddButton);
});