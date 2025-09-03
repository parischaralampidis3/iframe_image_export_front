let parsedIframeSrc = " ";
let generate = document.getElementById("generateBtn");
let form = document.getElementById("iframeform");
let clear = document.getElementById("clearBtn");


generate.addEventListener('click', generateButtonListener);
clear.addEventListener('click', clearButtonListener);

function getParsedIframeSrc() {
    let textAreaSrc = document.getElementById("src").value;
    const match = textAreaSrc.match(/src="(.*?)"/);
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
        capturePdf(parsedIframeSrc)
        capturePng(parsedIframeSrc)
    } else {
        alert('invalid iframe src');
    }
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
//I need a functionality to display the generated result at the frontend
    function generatedResult() {
        fetch("http://localhost:3000/parse"),{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
    
}

// show generated result at the front text container
    function showGeneratedResult(){
        let textAreaResult = document.getElementById("output");
        textAreaResult.style.display(generatedResult());
    }
 