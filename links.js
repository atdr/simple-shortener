var links = new Array();

window.onload = init;

function init() {
    getLinkData();
}

function getLinkData() {
    // open HTTP request
    var request = new XMLHttpRequest();
    request.open("GET", "links.json");
    request.onreadystatechange = function() {
        // HTTP 200 OK
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                // send response to parser
                parseLinkItems(this.responseText);
                addLinksToPage();
            }
            else {
                // print error
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}

function parseLinkItems(linkJSON) {
    // error if there's no input 
    if (linkJSON == null || linkJSON.trim() == "") {
        return;
    }
    // make an array from parsed JSON
    var linkArray = JSON.parse(linkJSON);
    if (linkArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    }
    // each link in array
    for (var i = 0; i < linkArray.length; i++) {
        var linkItem = linkArray[i];
        links.push(linkItem);
    }
}

function addLinksToPage() {
    var ul = document.getElementById("link-list");
    for (var i = 0; i < links.length; i++) {
        var linkItem = links[i];
        var li = document.createElement("li");
        li.innerHTML =
            linkItem.id + " redir to " + todoItem.url;
        ul.appendChild(li);
    }
}    