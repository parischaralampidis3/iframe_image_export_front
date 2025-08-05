console.log("script working");

const parseFetch = await fetch("http://localhost/3000/capture/parse"),{ 
    method: "POST",
    headers:{
        "Content-Type":"application/json",
    }
}