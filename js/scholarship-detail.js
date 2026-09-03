const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
const sidelinks = document.querySelector(".side-links");


// SIDEBAR

menuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});

sidelinks.addEventListener("click", function () {
    sidebar.classList.remove("active");
});


const countryCodes = {
    Turkey: "TR",
    Türkiye: "TR",
    Hungary: "HU",
    China: "CN",
    Japan: "JP",
    "South Korea": "KR",
    Italy: "IT",
    Romania: "RO",
    Brunei: "BN",
    Germany: "DE",
    France: "FR",
    Netherlands: "NL",
    Australia: "AU",
    "United Kingdom": "UK",
    Switzerland: "CH",
    "New Zealand": "NZ",
    Azerbaijan: "AZ",
    Canada: "CA",
    "United States": "US",
    Indonesia: "ID"
};


// LOAD SCHOLARSHIP

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

        const countryCode =
            scholarship.countryCode ||
            countryCodes[scholarship.country] ||
            scholarship.country.slice(0, 2).toUpperCase();


        // HERO

        const detailName = document.getElementById("detailName");

        detailName.textContent = scholarship.name;
        detailName.classList.toggle(
            "long-title",
            scholarship.name.length > 40
        );

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


        // HERO DEGREE TAGS

        const degreesContainer = document.getElementById("detailDegrees");
        degreesContainer.innerHTML = "";

        scholarship.degree.forEach(function (degree) {
            const tag = document.createElement("span");

            tag.classList.add("detail-tag");
            tag.textContent = degree;

            degreesContainer.appendChild(tag);
        });


        // FUNDING TAG

        const fundingTag = document.getElementById("detailFunding");

        if (scholarship.funding === "Fully Funded") {
            fundingTag.classList.add("detail-funding-tag");
            fundingTag.classList.remove("detail-partial-tag");
        } else {
            fundingTag.classList.remove("detail-funding-tag");
            fundingTag.classList.add("detail-partial-tag");
        }


        // HERO OFFICIAL WEBSITE

        const officialWebsite = document.getElementById("officialWebsite");

        if (scholarship.website) {
            officialWebsite.href = scholarship.website;
        } else {
            officialWebsite.style.display = "none";
        }


        document.title = `${scholarship.name} | ScholarBridge`;


        // QUICK OVERVIEW

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
            overviewFunding.classList.remove("overview-partially-funded");
        } else {
            overviewFunding.classList.remove("overview-fully-funded");
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


        // ABOUT

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


        const aboutFlag = document.getElementById("aboutFlag");

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


        // OTHER SECTIONS

        renderEligibility(scholarship);
        renderBenefits(scholarship);
        renderDocuments(scholarship);
        renderApplicationSteps(scholarship);
        renderDeadlineAndSource(scholarship);

    } catch (error) {
        console.error("Could not load scholarship:", error);
    }
}


// ELIGIBILITY

function renderEligibility(scholarship) {
    const eligibilityList = document.getElementById("eligibilityList");
    const eligibilitySection =
        document.querySelector(".eligibility-bands-section");

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

    eligibilityList.innerHTML = scholarship.eligibility
        .map(function (item, index) {
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
        })
        .join("");
}


// FUNDING & BENEFITS

function renderBenefits(scholarship) {
    const benefitsList = document.getElementById("benefitsList");
    const fundingStatus = document.getElementById("fundingStatus");
    const fundingSection = document.querySelector(".funding-section");

    if (!scholarship.benefits || scholarship.benefits.length === 0) {
        fundingSection.style.display = "none";
        return;
    }

    fundingStatus.textContent = scholarship.funding;

    const icons = {
        Tuition: "fa-solid fa-building-columns",
        "Living Support": "fa-solid fa-coins",
        Stipend: "fa-solid fa-coins",
        Accommodation: "fa-solid fa-house",
        Housing: "fa-solid fa-house",
        Travel: "fa-solid fa-plane-departure",
        Health: "fa-solid fa-shield-heart",
        Insurance: "fa-solid fa-shield-heart",
        Language: "fa-solid fa-language",
        "Language Course": "fa-solid fa-language",
        Books: "fa-solid fa-book",
        Meals: "fa-solid fa-utensils",
        Visa: "fa-solid fa-passport",
        "Study Support": "fa-solid fa-book-open",
        Other: "fa-solid fa-gift"
    };

    const statusIcons = {
        Included: "fa-solid fa-check",
        Partial: "fa-solid fa-circle-half-stroke",
        Varies: "fa-solid fa-circle-half-stroke"
    };

    benefitsList.innerHTML = scholarship.benefits
        .map(function (benefit) {
            const icon =
                icons[benefit.category] ||
                "fa-solid fa-circle-check";

            const statusClass = benefit.status
                .toLowerCase()
                .replace(/\s+/g, "-");

            const statusIcon =
                statusIcons[benefit.status] ||
                "fa-solid fa-circle-info";

            return `
                <article class="benefit-row">

                    <div class="benefit-icon">
                        <i class="${icon}"></i>
                    </div>

                    <div class="benefit-content">
                        <span>${benefit.category.toUpperCase()}</span>
                        <h3>${benefit.title}</h3>
                        <p>${benefit.description}</p>
                    </div>

                    <div class="benefit-status ${statusClass}">
                        <i class="${statusIcon}"></i>
                        ${benefit.status}
                    </div>

                </article>
            `;
        })
        .join("");
}


// REQUIRED DOCUMENTS

function renderDocuments(scholarship) {
    const documentsList = document.getElementById("documentsList");

    if (!scholarship.documents || scholarship.documents.length === 0) {
        return;
    }

    documentsList.innerHTML = scholarship.documents
        .map(function (document) {
            return `
                <div class="document-item">

                    <div class="document-check">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <div>
                        <span>${document.category.toUpperCase()}</span>
                        <h4>${document.title}</h4>
                        <p>${document.description}</p>
                    </div>

                </div>
            `;
        })
        .join("");
}


// APPLICATION STEPS

function renderApplicationSteps(scholarship) {
    const applySteps = document.getElementById("applySteps");

    if (
        !scholarship.applicationSteps ||
        scholarship.applicationSteps.length === 0
    ) {
        return;
    }

    applySteps.innerHTML = scholarship.applicationSteps
        .map(function (step, index) {
            const number = String(index + 1).padStart(2, "0");

            return `
                <article class="apply-step">

                    <div class="apply-step-number">
                        ${number}
                    </div>

                    <div class="apply-step-content">
                        <span>${step.stage.toUpperCase()}</span>
                        <h4>${step.title}</h4>
                        <p>${step.description}</p>
                    </div>

                </article>
            `;
        })
        .join("");
}


// DEADLINE & OFFICIAL SOURCE

function renderDeadlineAndSource(scholarship) {
    const deadlineValue =
        document.getElementById("deadlineValue");

    const finalOfficialWebsite =
        document.getElementById("finalOfficialWebsite");

    deadlineValue.textContent =
        scholarship.deadline || "Check Official Source";

    if (scholarship.website) {
        finalOfficialWebsite.href = scholarship.website;
    } else {
        finalOfficialWebsite.style.display = "none";
    }
}


loadScholarshipDetails();