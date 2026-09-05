const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
const sidelinks = document.querySelector(".side-links")

// Open Sidebar
menuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
});

// Close Sidebar
closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});

sidelinks.addEventListener("click", function () {
    sidebar.classList.remove("active");
})

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const subjectInput = document.getElementById("contactSubject");
const messageInput = document.getElementById("contactMessage");
const formStatus = document.getElementById("contactFormStatus");
const submitBtn = document.querySelector(".contact-submit-btn");

function showError(input, message) {
    const field = input.closest(".contact-field");
    const error = field.querySelector(".field-error");

    error.textContent = message;
    input.classList.add("input-error");
}

function clearError(input) {
    const field = input.closest(".contact-field");
    const error = field.querySelector(".field-error");

    error.textContent = "";
    input.classList.remove("input-error");
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let formIsValid = true;

    clearError(nameInput);
    clearError(emailInput);
    clearError(subjectInput);
    clearError(messageInput);

    formStatus.textContent = "";

    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name.");
        formIsValid = false;
    }

    if (emailInput.value.trim() === "") {
        showError(emailInput, "Please enter your email.");
        formIsValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        formIsValid = false;
    }

    if (subjectInput.value.trim() === "") {
        showError(subjectInput, "Please enter a subject.");
        formIsValid = false;
    }

    if (messageInput.value.trim() === "") {
        showError(messageInput, "Please write a message.");
        formIsValid = false;
    }

    if (!formIsValid) {
        formStatus.textContent = "Please check the fields above.";
        formStatus.classList.add("error");
        return;
    }

    formStatus.classList.remove("error");
    formStatus.classList.add("success");
    formStatus.textContent = "Your message is ready to send.";
});