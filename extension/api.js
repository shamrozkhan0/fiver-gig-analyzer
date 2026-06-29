const WEB_URL = "http://localhost:5173/"
const BACKEND_URL = "http://localhost:8000/"

console.log("Popup loaded");


async function isFiverTab() {

  let activeTab = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(activeTab);


  let url = tab.url.startsWith("https://www.fiverr.com/")
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
    const title = document.querySelector("div.container div.wrapper h1")
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
  const container = document.querySelector("div.container div.wrapper");

  container.innerHTML = `
    <h1>Scrapper</h1>

    <button id="btn">Start Scrapping</button>
    <div>
      <p class="title">Title: </p>
      <p class="description">description: </p>
      <p class="experties">Experties: </p>
      <p class="category-and-subcategory">Category and Subcategory: </p>
      <p class="packages">Packages: </p>
      <p class="tags">Tags: </p>
      <p class="profile-description">Profile Description: </p>
      <p class="rating">Rating: </p>
      <p class="reviews">Reviews: </p>
      <p class="gigstars">GigStarts: </p>
      <p class="aboutProfile">About Profile: </p>
    </div>

    <button id="logout">logout</button>

    <p id="output">Nothing yet</p>
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
