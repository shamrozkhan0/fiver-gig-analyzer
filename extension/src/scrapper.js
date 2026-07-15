import {
    getTitle,
    getDescription,
    getCategoryAndSubcategory, 
    getExpertise, 
    getPackage, 
    getSellerProfile, 
    getTags, 
    getRatings, 
    getSellerInfo, 
    getStarsReviews, 
    getGigUrl, 
    getProfileStatus,
    getTotalOrders} from "./gig"


function scrapper() {
    console.log("scrapper runs")
    const data = {
        title : getTitle(),
        gig_description : getDescription(),
        gig_category :  getCategoryAndSubcategory(),
        expertise : getExpertise(),
        packages : getPackage(),
        seller_profile_description : getSellerProfile(),
        tags : getTags(),
        ratings : getRatings(),
        total_orders : getTotalOrders(),
        total_stars : getStarsReviews(),
        seller_information : getSellerInfo(),
        gig_url: getGigUrl(),
        seller_status: getProfileStatus()
    }
    return data
}



(() => {
    const data = scrapper();
    console.log("data:", data);
    chrome.runtime.sendMessage({
        type: "SCRAPPED_DATA",
        data
    });
})();




//                 const safeStyle = (el, color = "#00ff43") => { if (el) el.style.background = color }
//                 const safeText = (el) => { return el ? el.innerText.trim().replace(/\s+/g, " ") : "Not Found in Gig" }

