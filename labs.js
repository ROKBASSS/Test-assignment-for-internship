function init() {
    goss11.addEventListener("click", function () {
        window.location.href = "./labs/xml/lab11/answer.xhtml"
    });
    goss12.addEventListener("click", function () {
        window.location.href = "./labs/xml/lab12/index.xml"
    });
    goss21.addEventListener("click", function () {
        window.location.href = './labs/analyze/laba21/index.html'
    });
    goss22.addEventListener("click", function () {
        window.location.href = "./labs/analyze/laba22/index.html"
    });
    goss3.addEventListener("click", function () {
        window.location.href = "./labs/async/fetch/index.html"
    });
}

function doSomethingElse() {
    fetch('./labs/xml/lab1/index.xml').then(response => {
        return response.text();
    }).then(data => {
        let parser = new DOMParser(),
            xmlDoc = parser.parseFromString(data, 'text/xml');
        console.log(xmlDoc)
    })
}

window.onload = function () {
    init();
    doSomethingElse();
};