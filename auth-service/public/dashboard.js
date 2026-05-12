async function loadProfile(){

}

async function displayProfile() {
    
}

async function saveProfile(){
    
}

async function loggout(){

}

window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user_login'));
    document.getElementById("user-info").innerHTML = `<p>Hallo: ${user.login}</p>`;
    
}