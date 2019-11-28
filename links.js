// constructor function
function link(url, id) {
    this.url = url;
    this.id = id;
}

var links = new Array();

function admin_init() {
    // grab JSON
    getLinkData();    
    // set up form processing
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;
}

function main_init() {
    getLinkData();
    console.log(links);  
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
                processLinkRedirect();
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

function processLinkRedirect() {
    // grab the hash
    id = window.location.hash;
    id = id.substr(1); // remove # character
    if (id) {
        getLinkData();
        // get data for this link
        var thisLink = links.find((link) => { return link.id === id; });
        if (thisLink) {
            location.href = thisLink.url;
        }
    } else {
        // TODO: if there isn't an id
    }
}

function addLinksToPage() {
    for (var i = 0; i < links.length; i++) {
        var linkItem = links[i];
        addLinkToPage(linkItem);
    }
}

function addLinkToPage(linkItem) {
    var ul = document.getElementById("link-list");
    var li = document.createElement("li");
    li.innerHTML =
        linkItem.id + " redir to " + linkItem.url;
    ul.appendChild(li);
}

function getFormData() {
    var url = document.getElementById("linkURL").value;
    var id = document.getElementById("linkID").value;
    // TODO: validate URL and ID
    if (url && id) {
        var linkItem = new link(url,id);
        links.push(linkItem);
        addLinkToPage(linkItem)
        // clean up the form
        document.forms[0].reset();
        // save new file
        saveLinks();
    }
}

function saveLinks() {
    var linksJSON = JSON.stringify(links);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(linksJSON);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
    request.send();
}