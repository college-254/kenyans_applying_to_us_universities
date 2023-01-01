/**
 * Fetch the URLs of all the pages in the /college-guide/ directory.
 */
const getCollegeGuideURLs = new Promise((resolve, _) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let urls = [];
        for (let item of xhr.responseXML.getElementsByTagName("item")) {
            urls.push(item.getElementsByTagName("link")[0].innerHTML);
        }
        urls.sort();
        resolve(urls);
    }

    xhr.open("GET", "/college-guide/index.xml");
    xhr.responseType = "document";
    xhr.send();
});

/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/Guide/Printing
 */
function closePrint () {
    document.body.removeChild(this.__container__);
}

/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/Guide/Printing
 */
function setPrint () {
    this.contentWindow.__container__ = this;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    let doc = this.contentWindow.document;

    // For some reason, the onload event for iframes is called twice. The second
    // time around has all of the contents loaded.
    if (doc.children[0].innerText.length > 0) {
        this.contentWindow.print();
    }
}

/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/Guide/Printing
 */
function printPage(url) {
    var oHideFrame = document.createElement("iframe");
    oHideFrame.onload = setPrint;
    oHideFrame.style.position = "fixed";
    oHideFrame.style.right = "0";
    oHideFrame.style.bottom = "0";
    oHideFrame.style.width = "0";
    oHideFrame.style.height = "0";
    oHideFrame.style.border = "0";
    oHideFrame.src = url;
    document.body.appendChild(oHideFrame);
}

/** Print all of the pages in the college guide. */
function printCollegeGuide() {
    getCollegeGuideURLs.then((urls) => {
        for (let url of urls) {
            printPage(url);
        }
    });
}
