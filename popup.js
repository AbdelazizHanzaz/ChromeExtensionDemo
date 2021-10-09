let changeColor = document.getElementById("changeColor");
let testButton = document.getElementById("testClick");

//get value of color from service worker "storage"
chrome.storage.sync.get("color", ({color})=>{
    changeColor.style.backgroundColor = color;
});

testButton.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function : getText,
    });
});

function getText(){
    console.log("Hello");
}

changeColor.addEventListener('click', async ()=>{
      let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

      chrome.scripting.executeScript({
          target: {tabId: tab.id},
          function : setPageBackgroundColor,
      });
    
});

function setPageBackgroundColor(){
    chrome.storage.sync.get("color", ({color})=>{
        document.body.style.backgroundColor = color;
    });
}