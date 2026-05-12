async function singIn(){
    const login = document.getElementById("input-login").value;
    const password = document.getElementById("input-pass").value;
    
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({login, password})
    });
    
    const data = await res.json();
    if(data.success){
        sessionStorage.setItem("token", data.token); //> sessionStorage.setItem("key", "value") - сохраняет значение в sessionStorage, где key - ключ, value - значение
        sessionStorage.setItem('user_login', JSON.stringify(data.user_login));
        window.location.href = "/dashboard";
    }
    else{
        alert(data.error);
    }
}

async function register(){
    const login = document.getElementById("input-login").value;
    const password = document.getElementById("input-pass").value;

    const res = await fetch("/api/register", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({login, password})
    });
    
    const data = await res.json();
    if(data.success){
        alert(data.message);
    }
    else{
        alert(data.error);
    }
}

window.onload = () =>{
    if(sessionStorage.getItem("token")){
        window.location.href = "/dashboard";
    }
}