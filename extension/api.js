const WEB_URL = "http://localhost:5173/"
const BACKEND_URL = "http://localhost:8000/"


// This gets 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SCRAPPED_DATA") {
        console.log("bg js:",message.data);
    }
});




async function isFiverTab() {

  let activeTab = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(activeTab);


  let url = tab.url.startsWith("https://www.fiverr.com/")
  console.log(url)



  if (url) {
    try {
      fetch("http://localhost:8000/me", {
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            showScrapper();
          } else {
            showLogin();
          }
        }).catch(err => {
          console.error(err)
        });
    } catch (error) {
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
    chrome.tabs.create({ url: WEB_URL + "login"});
  });

  const modal = document.querySelector("div.alert-modal")

  document.querySelector(".show-modal-btn").addEventListener("click", () => {
    modal.classList.add("message")
    setTimeout(() => {
      modal.classList.remove("message")
    }, 3200);
  })
};


const showScrapper = () => {
  const container = document.querySelector("div.container div.wrapper");

  container.innerHTML = `
    <h1>Scrapper</h1>

    <button id="btn">Start Scrapping</button>
    <!-- <div>
   <p class="title">Title: </p>
   <p class="description">description: </p>
   <p class="experties">Experties: </p>
   <p class="category-and-subcategory">Category and Subcategory: </p>
   <p class="packages">Packages: </p>
   <p class="tags">Tags: </p>
   <p class="profile-description">Profile Description: </p>
   <p class="rating">Rating: </p>
   <p class="reviews">Reviews: </p>
   <p class="aboutProfile">About Profile: </p>
   <p class="gigstars">GigStarts: </p>
     </div>
     --> 

    <button id="logout">logout</button>

    <p id="output">Nothing yet</p>
  `;



  // Scrapped Button 
  document.getElementById("btn").addEventListener("click", async () => {
    try{
      console.log("button is clicked")
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files : ["dist/scrapper.js"]
      })      
    }
    
    catch(error){
      console.error("Error: ", error)
    }

    // console.log("content is scrapped", isScrapped)
    // if (isScrapped.status){
    //   let url = WEB_URL + isScrapped.user_id + "/" + isScrapped.content_id
    //   console.log(url)
    //  setTimeout(()=>{
    //   //  chrome.tabs.create({ url: url }); 
    //  },3200)
    // }
  });





  // Logout Button
  document.getElementById("logout").addEventListener("click", () => {
    logout()
  })
};
