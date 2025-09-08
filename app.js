let parsedIframeSrc = " ";

let generate = document.getElementById("generateBtn");
let getResult = document.getElementById("getResultBtn");
let form = document.getElementById("iframeform");
let clear = document.getElementById("clearBtn");
let copy = document.getElementById("copyBtn");


generate.addEventListener('click', generateButtonListener);
getResult.addEventListener('click', getResultButtonListener);
clear.addEventListener('click', clearButtonListener);

function getParsedIframeSrc() {
    let textAreaSrc = document.getElementById("src").value;
    const match = textAreaSrc.match(/src=['"](.*?)['"]/);
    return match ? match[1] : null;
}

function clearButtonListener(e) {
    e.preventDefault();
    form.reset();
}

function generateButtonListener(e) {
    e.preventDefault();
    const parsed = getParsedIframeSrc();
    if (parsed) {
        parsedIframeSrc = parsed;
        parseResult(parsedIframeSrc);
    } else {
        alert('invalid iframe src');
    }
}

function getResultButtonListener(e) {
    e.preventDefault();
    return getGeneratedResult();
}

//I need a functionality to copy the generated code without copy/paste manually
function parseResult(url) {
    fetch('http://localhost:3000/capture/parse', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            iframe: `<iframe src="${url}"></iframe>`
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
}

function capturePdf(url) {
    fetch('http://localhost:3000/capture/pdf', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    })
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.pdf';
            a.click();
        })
        .catch((err) => console.error(err))
}

function capturePng(url) {
    fetch('http://localhost:3000/capture/png', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    })
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.png';
            a.click()
        })
        .catch((err) => console.log(err))
}

function getCurrentIframeSrc() {
    const iframe = document.querySelector("#preview iframe");
    if (iframe) {
        return iframe.src;
    }
    return null;
}

function updateDownloadButton() {
    const iframeSrc = getCurrentIframeSrc();
    if (!iframeSrc) return;
    const encondedUrl = encodeURIComponent(iframeSrc);
    const pdfBtn = document.querySelector("#downloadPdf");
    const pngBtn = document.querySelector("#downloadPng");

    pdfBtn.href = `http://localhost:3000/capture/getPdf?url=${encondedUrl}`
    pngBtn.href = `http://localhost:3000/capture/getPng?url=${encondedUrl}`
}
//I need a functionality to display the generated result at the frontend
function getGeneratedResult() {
    let url = parsedIframeSrc;
    if (!url) {
        alert("Please Generate an iframe first")
        return;
    }
    fetch("http://localhost:3000/capture/parse", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            iframe: `<iframe src="${url}"></iframe>`
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            let textAreaResult = document.getElementById("output");
            textAreaResult.value = `
            <div id="preview">
                <iframe src=${data.url}></iframe>
                <div>
                    <a id = "downloadPdf" href=#>Donwload Pdf</a>
                    <a id = "downloadPng" href=#">Download Png</a>
                </div>
            </div>
            `
            updateDownloadButton()
        })
        .catch((err) => {
            console.log(err);
        })

}



function copyResult() {
    let textAreaResult = document.getElementById("output");
    textAreaResult.select();
    textAreaResult.setSelectionRange(0, 999);

    navigator.clipboard.writeText(textAreaResult.value);
    alert("text is copied at the clipboard" + textAreaResult.value);
    console.log("text is coppied")

    navigator.clipboard.readText().then(text => console.log(text));
}