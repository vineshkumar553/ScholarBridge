// Elements select karo
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
});
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {

        const faqItem = question.parentElement;
        const faqIcon = question.querySelector(".faq-icon");

        faqItem.classList.toggle("active");

        const isOpen = faqItem.classList.contains("active");

        question.setAttribute("aria-expanded", isOpen);

        faqIcon.textContent = isOpen ? "−" : "+";
    });
});