const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
const sidelinks = document.querySelector(".side-links");

menuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});

sidelinks.addEventListener("click", function () {
    sidebar.classList.remove("active");
});


function renderEligibility(scholarship) {
    const eligibilityList = document.getElementById("eligibilityList");
    const eligibilitySection = document.querySelector(".eligibility-bands-section");

    if (!scholarship.eligibility || scholarship.eligibility.length === 0) {
        eligibilitySection.style.display = "none";
        return;
    }

    const icons = {
        Academic: "fa-solid fa-graduation-cap",
        Nationality: "fa-solid fa-earth-americas",
        Age: "fa-regular fa-calendar",
        Language: "fa-solid fa-language"
    };

    eligibilityList.innerHTML = scholarship.eligibility.map(function (item, index) {
        const number = String(index + 1).padStart(2, "0");

        const icon =
            icons[item.category] ||
            "fa-solid fa-circle-check";

        return `
            <article class="eligibility-band">

                <div class="band-number">
                    <span>${number}</span>
                </div>

                <div class="band-category">
                    <span>${item.category.toUpperCase()}</span>
                    <h3>${item.title}</h3>
                </div>

                <div class="band-description">
                    <p>${item.description}</p>
                </div>

                <div class="band-icon">
                    <i class="${icon}"></i>
                </div>

            </article>
        `;
    }).join("");
}


async function loadScholarshipDetails() {
    const params = new URLSearchParams(window.location.search);
    const scholarshipId = params.get("id");

    if (!scholarshipId) {
        window.location.href = "scholarships.html";
        return;
    }

    try {
        const response = await fetch("data/scholarships.json");
        const scholarships = await response.json();

        const scholarship = scholarships.find(function (item) {
            return item.id === scholarshipId;
        });

        if (!scholarship) {
            document.querySelector(".detail-hero").innerHTML = `
                <div class="container">
                    <h1>Scholarship not found</h1>
                    <a href="scholarships.html#scholarships">
                        Back to Scholarships
                    </a>
                </div>
            `;
            return;
        }

        const countryCodes = {
            "Turkey": "TR",
            "Türkiye": "TR",
            "Hungary": "HU",
            "China": "CN",
            "Japan": "JP",
            "South Korea": "KR",
            "Italy": "IT",
            "Romania": "RO",
            "Brunei": "BN",
            "Germany": "DE",
            "France": "FR",
            "Netherlands": "NL",
            "Australia": "AU",
            "United Kingdom": "UK",
            "Switzerland": "CH",
            "New Zealand": "NZ",
            "Azerbaijan": "AZ",
            "Canada": "CA",
            "United States": "US",
            "Indonesia": "ID"
        };

        const countryCode =
            scholarship.countryCode ||
            countryCodes[scholarship.country] ||
            scholarship.country.slice(0, 2).toUpperCase();


        const detailName = document.getElementById("detailName");

        detailName.textContent = scholarship.name;

        if (scholarship.name.length > 40) {
            detailName.classList.add("long-title");
        }


        document.getElementById("detailCountry").textContent =
            scholarship.country;

        document.getElementById("cardCountry").textContent =
            scholarship.country;

        document.getElementById("detailType").textContent =
            scholarship.type;

        document.getElementById("detailFunding").textContent =
            scholarship.funding;

        document.getElementById("heroCountryCode").textContent =
            countryCode;

        document.getElementById("cardCountryCode").textContent =
            countryCode;


        const detailFlag = document.getElementById("detailFlag");
        const cardFlag = document.getElementById("cardFlag");

        detailFlag.src = scholarship.flag;
        detailFlag.alt = `${scholarship.country} flag`;

        cardFlag.src = scholarship.flag;
        cardFlag.alt = `${scholarship.country} flag`;


        const degreesContainer =
            document.getElementById("detailDegrees");

        degreesContainer.innerHTML = "";

        scholarship.degree.forEach(function (degree) {
            const tag = document.createElement("span");

            tag.classList.add("detail-tag");
            tag.textContent = degree;

            degreesContainer.appendChild(tag);
        });


        const fundingTag =
            document.getElementById("detailFunding");

        if (scholarship.funding === "Fully Funded") {
            fundingTag.classList.add("detail-funding-tag");
        } else {
            fundingTag.classList.remove("detail-funding-tag");
            fundingTag.classList.add("detail-partial-tag");
        }


        const officialWebsite =
            document.getElementById("officialWebsite");

        if (scholarship.website) {
            officialWebsite.href = scholarship.website;
        } else {
            officialWebsite.style.display = "none";
        }


        document.title =
            `${scholarship.name} | ScholarBridge`;


        document.getElementById("overviewCountry").textContent =
            scholarship.country;

        document.getElementById("overviewFunding").textContent =
            scholarship.funding;

        document.getElementById("overviewType").textContent =
            scholarship.type;


        const overviewFunding =
            document.getElementById("overviewFunding");

        if (scholarship.funding === "Fully Funded") {
            overviewFunding.classList.add("overview-fully-funded");
        } else {
            overviewFunding.classList.add("overview-partially-funded");
        }


        const overviewDegrees =
            document.getElementById("overviewDegrees");

        overviewDegrees.innerHTML = "";

        scholarship.degree.forEach(function (degree) {
            const tag = document.createElement("span");

            tag.textContent = degree;

            overviewDegrees.appendChild(tag);
        });


        document.getElementById("aboutHeadline").textContent =
            scholarship.aboutHeadline;

        document.getElementById("aboutCountry").textContent =
            scholarship.country;

        document.getElementById("aboutType").textContent =
            scholarship.type;

        document.getElementById("aboutFunding").textContent =
            scholarship.funding;

        document.getElementById("aboutCountryCode").textContent =
            countryCode;


        const aboutFlag =
            document.getElementById("aboutFlag");

        aboutFlag.src = scholarship.flag;
        aboutFlag.alt = `${scholarship.country} flag`;


        const scholarshipAbout =
            document.getElementById("scholarshipAbout");

        scholarshipAbout.innerHTML = "";

        scholarship.about.forEach(function (paragraph) {
            const p = document.createElement("p");

            p.textContent = paragraph;

            scholarshipAbout.appendChild(p);
        });


        renderEligibility(scholarship);

    } catch (error) {
        console.error("Could not load scholarship:", error);
    }
}


loadScholarshipDetails();