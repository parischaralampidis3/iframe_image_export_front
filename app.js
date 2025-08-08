let parsedIframeSrc = " ";

//let textAreaSrc = document.getElementById("src").value;
let generate = document.getElementById("generateBtn");
generate.addEventListener('click',generateButtonListener);

function getParsedIframeSrc(){
 let textAreaSrc = document.getElementById("src").value;
 const match = textAreaSrc.match(/src="(.*?)"/);
 return match ? match[1] : null;
}


function generateButtonListener(e){
e.preventDefault();

const parsed = getParsedIframeSrc();
if(parsed){
parsedIframeSrc = parsed;
parseResult(parsedIframeSrc);
}else{
    alert('invalid iframe src');
}
}


//parse function

function parseResult(url){


fetch('http://localhost:3000/capture/parse',{
    method:"POST",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        iframe: `<iframe src="${url}"></iframe>`
    })
     })
    .then((response)=>{
return response.json();    
})
.then((data) => console.log(data))
.catch((err)=> console.error(err))
}


function capturePdf(){
   

    fetch('http://localhost:3000/capture/pdf',{
        method:"POST",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            url:parsedIframeSrc
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


function capturePng(){
   
    
    fetch('http://localhost:3000/capture/png',{
    method:"POST",
    headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        url:parsedIframeSrc
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