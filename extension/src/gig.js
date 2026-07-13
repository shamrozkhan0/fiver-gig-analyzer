import TurndownService from "turndown";

const convertmd = new TurndownService();
console.log("gig.js loaded");

export function getTitle() {
    let title = document.querySelector("div.gig-overview h1");
    title = title.textContent.trim().toLowerCase().replace("i will", "").trim()  
    console.log("getting tite")
    return title
}


export function getDescription() {
    const description = document.querySelector("div.description-wrapper div.description-content");
    return convertmd.turndown(description.innerHTML)
}


// const getCategoryAndSubcategory = () => {
//     const categoryAndSubcategory = document.querySelector("ol.m2d0eb0");
//     return categoryAndSubcategory
// }


// const getExpertise = () => {
//     const experties = document.querySelector("ul.metadata");
//           let expertiesJson = [];
//                 if (experties) {
//                     const finalExperties = experties.querySelectorAll("li.metadata-attribute");

//                     finalExperties.forEach((el) => {
//                         const title = el.querySelector("p")?.textContent
//                             ?.trim()
//                             .replace(/\s+/g, " ");

//                         const items = [...el.querySelectorAll("ul li")].map(li =>
//                             li.textContent.trim().replace(/\s+/g, " ")
//                         );

//                         if (title) {
//                             expertiesJson.push({
//                                 title,
//                                 items
//                             });
//                         }
//                     });
//                 }
//     return expertiesJson
// }


// const getPackage = () => {
//     const packageTabs = document.querySelectorAll( "div.packages-tabs div.nav-container label");
//     const packages = {};

//     try {
//         packageTabs.forEach((tab) => {
//         if (!tab) return;
//             tab.click();

//             const content = document.querySelector("div.packages-tabs div.package-content");
//             packages[tab.innerText.trim()] = {
//                 "heading": content.querySelector("package-header-title").innerText.trim(),

//             };
        
        
//             });
//     } 
//     catch (e) {
//         console.log("Package extraction error:", e);
//     }

//     const item = document.querySelector(".collapsable-package-item");
//     const header = item?.querySelector(".collapsable-header");

//     if (item?.classList.contains("collapsed") || header?.classList.contains("collapsed")) {
//         console.log("Section is closed → opening");
//         header?.click();
//     }
//     return packages
// }
