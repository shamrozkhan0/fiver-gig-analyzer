document.getElementById("btn").addEventListener("click", async () => {
    try {
        
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {

                const safeText = (el) =>
                    el ? el.innerText.trim() : "Not Found in Gig";

                const safeStyle = (el, color = "#00ff43") => {
                    if (el) el.style.background = color;
                };

                const title = document.querySelector("h1");
                const description = document.querySelector("div.description-wrapper");
                const experties = document.querySelector("ul.metadata");
                const categoryAndSubcategory = document.querySelector("ol.m2d0eb0");

                safeStyle(title);
                safeStyle(description);
                safeStyle(experties);
                safeStyle(categoryAndSubcategory);

                // Package handling safely
                const packageTabs = document.querySelectorAll(
                    "div.packages-tabs div.nav-container label"
                );

                // safeStyle(packageTabs)

                const packages = {};

                try {
                    packageTabs.forEach((tab) => {
                        if (!tab) return;

                        tab.click();

                        const content = document.querySelector(
                            "div.packages-tabs div.package-content"
                        );

                        safeStyle(content)

                        packages[tab.innerText.trim()] = {
                            content: safeText(content)
                        };
                    });
                } catch (e) {
                    console.log("Package extraction error:", e);
                }

                const item = document.querySelector(".collapsable-package-item");
                const header = item?.querySelector(".collapsable-header");

                if (item?.classList.contains("collapsed") || header?.classList.contains("collapsed")) {
                    console.log("Section is closed → opening");
                    header?.click();
                }

                const userProfileDescrption = document.querySelector("article.seller-desc");
                const tags = document.querySelector("div.gig-tags-container ul");
                const rating = document.querySelector("div.ranking");

                safeStyle(userProfileDescrption, "#00ff43");
                safeStyle(tags, "#00ff40");
                safeStyle(rating, "#00ff40");

                const totalReview = document.querySelector("header.reviews-header div.details")
                safeStyle(totalReview)



                const starReviews = {}

                try {

                    const reviewsPerStar = document.querySelectorAll("table.stars-counters tbody tr")
                    reviewsPerStar.forEach(el => {
                        starReviews[el.querySelector("span.stars-filter-wrapper").innerText.trim()] = el.querySelector("td.star-num").innerText.trim()
                        safeStyle(el, "#00ff43")
                    })
                } catch (error) {
                    console.error(error)
                }

                sellerInfo = {}

                try {
                    const profileCredentials = document.querySelectorAll("ul.user-stats li");
                    profileCredentials.forEach(el => {
                        const strong = el.querySelector("strong");

                        if (!strong) return;

                        const key =
                            el.querySelector("p")?.innerText.trim() ||
                            el.textContent.replace(strong.textContent, "").trim();

                        sellerInfo[key] = strong.textContent.trim();
                        safeStyle(el)
                    })

                } catch (error) {
                    console.error(error)
                }

                return {
                    gig: {
                        title: safeText(title),
                        description: safeText(description),
                        experties: safeText(experties),
                        categoryAndSubcategory: safeText(categoryAndSubcategory),
                        packages: Object.keys(packages).length
                            ? JSON.stringify(packages)
                            : "Not Found in Gig",
                        tags: safeText(tags),
                        totalReview: safeText(totalReview),
                        gigStars: Object.keys(starReviews).length ? JSON.stringify(starReviews) : "Not Found in Gig"
                    },

                    profile: {
                        userProfileDescrption: safeText(userProfileDescrption),
                        rating: safeText(rating),
                        profileCredential: Object.keys(sellerInfo).length ? JSON.stringify(sellerInfo) : "Not Found in Gig",
                    }
                };
            }
        });

        const data = results[0].result;

        const content = `
                Title: ${data.gig.title}

                Description: ${data.gig.description}

                Experties: ${data.gig.experties}

                Category & Subcategory: ${data.gig.categoryAndSubcategory}

                Packages: ${data.gig.packages}

                Tags: ${data.gig.tags}

                UserProfileDescription: ${data.profile.userProfileDescrption}

                Ratings: ${data.profile.rating}

                TotalReview: ${data.gig.totalReview}

                GigStars: ${data.gig.gigStars}

                AboutProfile: ${data.profile.profileCredential}

        `;

        console.log(content);
        document.getElementById("output").innerText = content;

    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText =
            `Error: ${error.message}`;
    }
});