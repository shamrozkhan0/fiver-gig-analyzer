document.getElementById("btn").addEventListener("click", async () => {
    try {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const title = document.querySelector("h1");
                title.style.background = "#00ff43";

                const description = document.querySelector("div.description-wrapper");
                description.style.background = "#00ff43";

                const experties = document.querySelector("ul.metadata")
                experties.style.background = "#00ff43";

                const categoryAndSubcategory = document.querySelector("ol.m2d0eb0")
                categoryAndSubcategory.style.background = "#00ff43";

                const packageTabs = document.querySelectorAll(
                    "div.packages-tabs div.nav-container label"
                );

                const item = document.querySelector(".collapsable-package-item");
                const header = item?.querySelector(".collapsable-header");

                if (item?.classList.contains("collapsed") || header?.classList.contains("collapsed")) {
                    console.log("Section is closed → opening");
                    header.click();
                }
                const packages = {};

                packageTabs.forEach((tab, index) => {
                    tab.click();

                    packages[tab.innerText.trim()] = {
                        content: document.querySelector("div.packages-tabs div.package-content").innerText.trim()
                    };
                });

                console.log("this is package: " + packages);


                packages.style.background = "#00ff43";

                const userProfileDescrption = document.querySelector("article.seller-desc")
                userProfileDescrption.style.background = "#00ff43"

                const tags = document.querySelector("div.gig-tags-container ul");
                tags.style.background = "#00ff40"

                const rating = document.querySelector("div.ranking");
                rating.style.background = "#00ff40"


                return {
                    gig: {
                        title: title ? title.innerText.trim() : "Title Not Found",
                        description: description
                            ? description.innerText.trim()
                            : "Description Not Found",
                        experties: experties ? experties.innerText.trim() : "Experities Not Found",
                        categoryAndSubcategory: categoryAndSubcategory ? categoryAndSubcategory.innerText.trim() : "Category And Subcategory Not Found",
                        packages: packages ? JSON.stringify(packages) : "Packages Not Found",
                        tags: tags ? tags.innerText.trim() : "Tags Not Found",

                    },

                    profile: {
                        userProfileDescrption: userProfileDescrption ? userProfileDescrption.innerText.trim() : "Gig Description Not found",
                        rating: rating ? rating.innerText.trim() : "Rating Not Found"
                    }
                };
            }
        });


        const data = results[0].result;
        content = `
                Title: ${data.gig.title} \n
                
                Description: ${data.gig.description} \n
                
                experities: ${data.gig.experties} \n
                
                categoryAndSubcategory: ${data.gig.categoryAndSubcategory} \n
                
                packages: ${data.gig.packages} \n
                                
                Tags:\n ${data.gig.tags} \n
                
                userProfileDescription: ${data.profile.userProfileDescrption} \n

                ratings:\n ${data.profile.rating}
                `;

        console.log(content)
        document.getElementById("output").innerText = content


    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText =
            `Error: ${error.message}`;
    }
});