console.log("background file")
chrome.cookies.get({ url: "http://localhost:8000", name: "jwt_token" }, (cookie) => {
  console.log(cookie?.value);
});