//console.log("script working");
//parse function

function parseResult(){
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