window.onload = init;

function init() {
    getLinkData();
}

function getLinkData() {
    var request = new XMLHttpRequest();
    request.open("GET", "links.json");
    request.onreadystatechange = function() {
        var listDiv = document.getElementById("link-list");
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                listDiv.innerHTML = this.responseText;
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}