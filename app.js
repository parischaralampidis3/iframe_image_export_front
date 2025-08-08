let parsedIframeSrc = " ";

let textAreaSrc = document.getElementById("src").value;
let generate = document.getElementById("generateBtn");
generate.addEventListener('click',generateButtonListener);

function parsedIframeFunction(){
    let parsedIframeResult = parsedIframeSrc;
    return parsedIframeResult;
}
parsedIframeFunction();

function generateButtonListener(e){
e.preventDefault();
let src= /src="(.*?)"/;
let textAreaSrc = document.getElementById("src").value;
const match = textAreaSrc.match(src);
if(match){
parsedIframeSrc = match[1];
}
}

//parse function

function parseResult(){
parsedIframeFunction();

fetch('http://localhost:3000/capture/parse',{
    method:"POST",
    headers:{
        "Accept":"application/json",
        'Content-Type':"application/json"
    },
    body:JSON.stringify({
        iframe:'<iframe title="analysi_proipologizomenis_dapanis" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiYzRmYmFhNjMtOTlkNi00Yjk5LTg0M2EtNGI5NjJiYjA5ZmY3IiwidCI6IjU4OTJhYWZmLTBhYTUtNGQ5YS1iNzUxLTU0NzEzZTFkMDUzYSIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe>'
    })
     })
    .then((response)=>{
return response.json();    
})
.then((data) => console.log(data))
.catch((err)=> console.error(err))
}
parseResult()

//capturePdf 

function capturePdf(){
    parsedIframeFunction();

    fetch('http://localhost:3000/capture/pdf',{
        method:"POST",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            url: "https://app.powerbi.com/view?r=eyJrIjoiYzRmYmFhNjMtOTlkNi00Yjk5LTg0M2EtNGI5NjJiYjA5ZmY3IiwidCI6IjU4OTJhYWZmLTBhYTUtNGQ5YS1iNzUxLTU0NzEzZTFkMDUzYSIsImMiOjl9"
        })
    })
    .then((response)=>{
        return response.blob();
    })
    .then((blob)=>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        a.click();
    })
    .catch((err)=>console.error(err))
}
capturePdf()



function capturePng(){
    parsedIframeFunction();
    
    fetch('http://localhost:3000/capture/png',{
    method:"POST",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        url: "https://app.powerbi.com/view?r=eyJrIjoiYzRmYmFhNjMtOTlkNi00Yjk5LTg0M2EtNGI5NjJiYjA5ZmY3IiwidCI6IjU4OTJhYWZmLTBhYTUtNGQ5YS1iNzUxLTU0NzEzZTFkMDUzYSIsImMiOjl9"
    })
})
.then((response)=>{
    return response.blob();
})
.then((blob)=>{
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.png';
    a.click()
})
.catch((err)=>console.log(err))
}