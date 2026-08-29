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

    } catch (error) {
        console.error("Could not load scholarship:", error);
    }
}

loadScholarshipDetails();