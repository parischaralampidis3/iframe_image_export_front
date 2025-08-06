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

