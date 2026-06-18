const WEB_URL = "https://google.com"

chrome.storage.local.get("gigbro_token", (res) => {
    if (!res.gigbro_token) {
        showLogin()
    } else {
        // window.location.href = "scrapper.html"
        showScrapper()
    }
})


const showLogin = () => {
    const container = document.querySelector("div.container");

    container.innerHTML = `
        <h1>Seems like you are not logged in</h1>
        <button type="button" id="loginButton">Login</button>
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
    `
}
