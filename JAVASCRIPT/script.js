// Elements select karo
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");

// Open Sidebar
menuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
});

// Close Sidebar
closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});