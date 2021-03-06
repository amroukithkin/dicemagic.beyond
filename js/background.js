
function getRoll(cmd, sendResponse) {
    let roll = new XMLHttpRequest;
    roll.open("POST", "https://api.dicemagic.io/roll");
    roll.setRequestHeader("Content-Type", "application/json");
    console.log(cmd)
    roll.send(cmd);
    roll.onreadystatechange = function() {
        if (roll.readyState === 4) {
            console.log('done', roll)
            return sendResponse(JSON.parse(roll.responseText))
        }
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('request', request)
        console.log('sender', sender,)
        console.log(sender.tab ? 
            "from a content script " + sender.tab.url :
            "from the extension")
        if (request.msg) {
            getRoll(request.msg, sendResponse)
            console.log(request.msg)
            return true
        }
    }
)

