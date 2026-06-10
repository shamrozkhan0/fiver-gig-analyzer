document.getElementById("btn").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const el = document.querySelector(".ellipsis a");
            return el ? el.innerText.trim() : "NOT FOUND";
        }
    });

    document.getElementById("output").innerText = results[0].result;
});