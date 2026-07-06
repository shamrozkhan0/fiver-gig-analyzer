function showModal(message, isSucess) {
    const modal = document.querySelector("div.alert-modal")
    if (isSucess) {
        modal.classList.remove("d-none")
        modal.classList.add("message")
        modal.querySelector("p.alert-modal-text").textContent = message
    } else {
        console.log("modal show red")

    }

    setTimeout(() => {
        modal.classList.add("d-none")
        modal.classList.remove("message")
        return true
    }, 3200)

}


async function startScrapping() {
    const BACKEND_SAVE_DATA_URL = "http://localhost:8000/savecontent"

    try {

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {

                const safeText = (el) =>
                    el ? el.innerText.trim().replace(/\s+/g, " ") : "Not Found in Gig";

                const safeStyle = (el, color = "#00ff43") => {
                    if (el) el.style.background = color;
                };

                const title = document.querySelector("div.gig-overview h1");
                const description = document.querySelector("div.description-wrapper");
                const experties = document.querySelector("ul.metadata");
                const categoryAndSubcategory = document.querySelector("ol.m2d0eb0");

                let expertiesJson = [];
                let finalExperties = experties.querySelectorAll("li.metadata-attribute")
                finalExperties.forEach((el) => {
                    expertiesJson.push({
                        title: el.querySelector("p").textContent.trim().replace(/\s+/g, " "),
                        items: [...el.querySelectorAll("ul li")].map(li => li.textContent.trim().replace(/\s+/g, " ") )
                    })
                })




                safeStyle(title);
                safeStyle(description);
                safeStyle(experties);
                safeStyle(categoryAndSubcategory);

                const packageTabs = document.querySelectorAll(
                    "div.packages-tabs div.nav-container label"
                );

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
                const tags = document.querySelector("div.gig-tags-container ul")
                const getTags = [...tags.querySelectorAll(" li")]
                    .map(tag => tag.innerText.trim())
                    .join(", ");

                console.log(getTags);
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
                        experties: expertiesJson,
                        categoryAndSubcategory: safeText(categoryAndSubcategory),
                        packages: Object.keys(packages).length
                            ? JSON.stringify(packages)
                            : "Not Found in Gig",
                        tags: getTags,
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

        // console.log(content);

        const response = await fetch(BACKEND_SAVE_DATA_URL, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: data.gig.title,
                description: data.gig.description,
                expertise: data.gig.experties,
                category_and_subcategory: data.gig.categoryAndSubcategory,
                packages: data.gig.packages,
                tags: data.gig.tags,
                profile_description: data.profile.userProfileDescrption,
                ratings: data.profile.rating,
                total_review: data.gig.totalReview,
                gig_stars: data.gig.gigStars,
                about_profile: data.profile.profileCredential,
            })

        })
        const data_response = await response.json()
        console.log(data_response)

        if (!response.status === 401) {
            const result = await response.json()
            console.log(result)
            console.log("Error comes in response")
            return false
        } else {
            showModalDone = showModal("scrapped successfull", true)
            console.log("id", data_response.content_id)
            console.log("done:", showModalDone)
            document.getElementById("output").innerText = content;
            return {
                status: true,
                user_id: data_response.user_id,
                content_id: data_response.content_id
            }
        }
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText =
            `Error: ${error.message}`;
        return false
    }
}


window.startScrapping = startScrapping;