
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

async function loadScholarships() {
    const response = await fetch("data/scholarships.json");
    const scholarships = await response.json();

    const grid = document.getElementById("scholarshipsGrid");
    const resultsCount = document.getElementById("resultsCount");
    const searchInput = document.getElementById("searchInput");
    const clearFilters = document.getElementById("clearFilters");
    const filterGroups = document.querySelectorAll(".filter-options");
    const noResults = document.getElementById("noResults");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    let visibleCount = 9;
    let currentList = scholarships;

    function cleanValue(value) {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ı/g, "i")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
    }

    function renderScholarships(list) {
        grid.innerHTML = "";
        currentList = list;

        const visibleScholarships = list.slice(0, visibleCount);

        visibleScholarships.forEach(function(scholarship) {
            const card = document.createElement("article");
            card.classList.add("scholarship-card");

            let fundingClass = "partially-funded";

            if (scholarship.funding === "Fully Funded") {
                fundingClass = "fully-funded";
            }

            card.innerHTML = `
                <div class="card-top">
                    <div class="country-info">
                        <img src="${scholarship.flag}" alt="${scholarship.country} flag">
                        <span>${scholarship.country}</span>
                    </div>

                    <span class="funding-badge ${fundingClass}">
                        ${scholarship.funding}
                    </span>
                </div>

                <div class="card-content">
                    <h3>${scholarship.name}</h3>

                    <div class="degree-list">
                        ${scholarship.degree.map(function(degree) {
                            return `<span>${degree}</span>`;
                        }).join("")}
                    </div>

                    <p class="scholarship-type">${scholarship.type}</p>
                </div>

                <a href="scholarship.html?id=${scholarship.id}" class="details-link">
                    View Details
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            `;

            grid.appendChild(card);
        });

        resultsCount.textContent = `${list.length} scholarships found`;

        if (list.length === 0) {
            noResults.style.display = "block";
            loadMoreBtn.style.display = "none";
        } else {
            noResults.style.display = "none";

            if (list.length > visibleCount) {
                loadMoreBtn.style.display = "inline-flex";
            } else {
                loadMoreBtn.style.display = "none";
            }
        }
    }

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase().trim();

        const countryChip = document.querySelector(
            '[data-filter="country"] .filter-chip.active'
        );

        const degreeChip = document.querySelector(
            '[data-filter="degree"] .filter-chip.active'
        );

        const fundingChip = document.querySelector(
            '[data-filter="funding"] .filter-chip.active'
        );

        const country = countryChip.dataset.value;
        const degree = degreeChip.dataset.value;
        const funding = fundingChip.dataset.value;

        const filtered = scholarships.filter(function(scholarship) {
            const searchMatch = scholarship.name
                .toLowerCase()
                .includes(searchText);

            const countryMatch =
                country === "all" ||
                cleanValue(scholarship.country) === country;

            const degreeMatch =
                degree === "all" ||
                scholarship.degree.some(function(item) {
                    return cleanValue(item) === degree;
                });

            const fundingMatch =
                funding === "all" ||
                cleanValue(scholarship.funding) === funding;

            return searchMatch &&
                countryMatch &&
                degreeMatch &&
                fundingMatch;
        });

        visibleCount = 9;
        renderScholarships(filtered);
    }

    searchInput.addEventListener("input", applyFilters);

    filterGroups.forEach(function(group) {
        const chips = group.querySelectorAll(".filter-chip");

        chips.forEach(function(chip) {
            chip.addEventListener("click", function() {
                chips.forEach(function(item) {
                    item.classList.remove("active");
                });

                chip.classList.add("active");
                applyFilters();
            });
        });
    });

    clearFilters.addEventListener("click", function() {
        searchInput.value = "";

        filterGroups.forEach(function(group) {
            const chips = group.querySelectorAll(".filter-chip");

            chips.forEach(function(chip) {
                chip.classList.remove("active");

                if (chip.dataset.value === "all") {
                    chip.classList.add("active");
                }
            });
        });

        visibleCount = 9;
        renderScholarships(scholarships);
    });

    loadMoreBtn.addEventListener("click", function() {
        visibleCount = currentList.length;
        renderScholarships(currentList);
    });

    renderScholarships(scholarships);
}

loadScholarships();
    
