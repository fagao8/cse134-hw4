const username = document.getElementById("name");
const email = document.getElementById("email");
const comments = document.getElementById("comments");
const err = document.getElementById("comment-err");
const charCount = document.getElementById("char-count");
var formErrors = [];
const form = document.querySelector("form");

username.addEventListener("input", (e) => {
    if (username.validity.tooShort) {
        username.setCustomValidity("Please enter your full name!");
    }
    else {
        username.setCustomValidity("");
    }
});

email.addEventListener("input", (e) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I am expecting an email address!");
    } 
    else {
        email.setCustomValidity("");
    }
});

comments.addEventListener("input", (e) => {
    if (comments.validity.tooShort) {
        comments.setCustomValidity("This comment is too short!");
    }
    else if (comments.validity.tooLong) {
        comments.setCustomValidity("Be concise!");
    }
    else {
        comments.setCustomValidity("");
    }

});

comments.addEventListener("input", (e) => {
    const p = /^[a-zA-Z0-9.,!?'":;\(\)\-_ ]*$/
    const global_p = /[a-zA-Z0-9.,!?'":;\(\)\-_ ]*/g
    const mask_p = /[^a-zA-Z0-9.,!?'":;\(\)\-_ ]*/g
    if (!p.test(comments.value)) {
        const invalid = e.target.value.replace(global_p, '');
        const masked = e.target.value.replace(mask_p, '');
        comments.value = masked
        err.textContent = "Invalid character: " + invalid
        comments.classList.add("flash");
        err.classList.add("warn");
        formErrors.push({field: "comments", type: "invalid character: " + invalid});

        setTimeout(function() {
            err.textContent = "Do not use non-typical characters"
            comments.classList.remove("flash");
            err.classList.remove("warn");
        }, 1500);
    }
    else {
        err.textContent = "Do not use non-typical characters"
    }
});

comments.addEventListener("input", (e) => {
    const len = comments.value.length;
    charCount.textContent = len + "/300";

    if (len >= 250) {
        charCount.classList.add("warn");
        if (len >= 300) {
            charCount.classList.add("bold");
        }
    }
    else {
        charCount.classList.remove("warn");
        charCount.classList.remove("bold");
    }
});

const button = document.querySelector("button");

button.addEventListener("click", (e) => {
    if (username.validity.tooShort) {
        formErrors.push({field: "name", type: "too short"});
    }
    if (username.validity.valueMissing) {
        formErrors.push({field: "name", type: "missing field"});
    }
    if (email.validity.typeMismatch) {
        formErrors.push({field: "email", type: "type mismatch"});
    } 
    if (email.validity.valueMissing) {
        formErrors.push({field: "email", type: "missing field"});
    }
    if (comments.validity.tooShort) {
        formErrors.push({field: "comments", type: "too short"});
    }
    if (comments.validity.tooLong) {
        formErrors.push({field: "comments", type: "too long"});
    }
    if (comments.validity.valueMissing) {
        formErrors.push({field: "comments", type: "missing field"});
    }

    if (form.checkValidity()) {
        const prevErr = document.querySelector('input[name="form-errors"]');
        if (prevErr) {
            // handle submitting form more than once
            form.removeChild(prevErr);
        }
        if (formErrors.length != 0) {
            const errField = document.createElement("input");
            errField.type = "hidden";
            errField.name = "form-errors";
            errField.value = JSON.stringify(formErrors);
            form.appendChild(errField);
            formErrors = []
        }
        form.submit();
    }
});