import { startScrapping } from "./index.js"


const WEB_URL = "http://localhost:5173/"


chrome.storage.local.get("gigbro_token", (res) => {
    if (!res.gigbro_token) {
        showLogin()
    } else {
        showScrapper()
    }
})
 

const showLogin = () => {
    const container = document.querySelector("div.container");

    container.innerHTML = `
    <div class="row display-flex align-items-center justify-center flex-column py-50 gap-20">
        <img src="./images/gigBro-logo.png" alt="" class="login-gigbro-logo">
        <h2>Welcome to GigGro</h2>
        <p class="text-center text">Looks like you are not logged in </br>
         please login to continue and access all features </p>
        <button type="button" id="loginButton"><b>Login</b></button>
      </div>
    `;

    // attach AFTER DOM exists
    document.getElementById("loginButton").addEventListener("click", () => {
        chrome.tabs.create({ url: WEB_URL });
    });
};


const showScrapper = () => {
    const container = document.querySelector("div.container")
    container.innerHTML = `
    <h1>Scrapper</h1>
    
    <button id="btn">Get Title</button>

    <p id="output">Nothing yet</p>

    <form action="http://127.0.0.1:8000/" method="post">
    <input name="content" type="text" id="cotent">
    <button type="submit">submit</button>
    </form>
    `;

    document.getElementById("btn").addEventListener("click", () => {
        startScrapping()
    })


}
