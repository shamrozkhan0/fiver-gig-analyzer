const WEB_URL = "http://localhost:5173/"
const BACKEND_URL = "http://localhost:8000/"

console.log("Popup loaded");


async function isFiverTab() {

  let activeTab = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(activeTab);


  let url = tab.url.includes("https://www.fiverr.com/")
  console.log(url)

  if (url) {
   try{
     fetch("http://localhost:8000/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          showScrapper();
        } else {
          showLogin(); 
        }
      }).catch(err =>{
        console.error(err)
      });
   } catch(error){
    console.error(error)
   }

  } else {
    const html = `
      <h1>You are not in Fiver</h1>
    `
    const title = document.querySelector("div.container h1")
    title.textContent = "Not on Fiver"
  }

}

isFiverTab()



async function logout() {
  await fetch(BACKEND_URL + "logout", {
    method: "POST",
    credentials: "include"
  });
  console.log("logout completed")
  showLogin()

}



const showLogin = () => {
  const container = document.querySelector("div.container");
  container.innerHTML = `
    <div class="row display-flex align-items-center justify-center flex-column py-50 gap-20">
        <img src="./images/gigBro-logo.png" alt="" class="login-gigbro-logo">
        <h2>Welcome to GigBro</h2>
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
  const container = document.querySelector("div.container");

  container.innerHTML = `
    <h1>Scrapper</h1>

    <button id="btn">Get Gig Content</button>

    <p id="output">Nothing yet</p>

    <form id="scrapeForm">
      <input name="content" type="text" id="content" />
      <button type="submit">submit</button>
    </form>
    <button id="logout">logout<button/>
  `;

  // button click
  document.getElementById("btn").addEventListener("click", () => {
    startScrapping();
  });

  document.getElementById("logout").addEventListener("click", () => {
    logout()
  })

  // form submit (IMPORTANT: prevent reload)
  document.getElementById("scrapeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("content").value;
    console.log("Form value:", value);
  });
};
