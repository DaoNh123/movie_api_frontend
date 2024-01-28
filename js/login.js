class LoginRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    toString() {
        return `LoginRequest { username: ${this.username}, password: ${this.password} }`;
    }
  }

const loginAction = (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if(username.trim() !== "" && password.trim() !== ""){
        console.log(username + " " + password);
        let loginRequest = new LoginRequest(username, password);
    
        console.log(loginRequest);
        let responseStatus = 0;
    
        let loginUrl = `${backendUrl}/api/accounts/login`;
        fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify(loginRequest),
            headers: {
                "Content-Type": "application/json" // Specify content type
            }
        })
        .then(res => {
            console.log(res.status);
            responseStatus = res.status;
            return res.json();
        })
        .then(data => {
            console.log(rememberMeInput.checked);
            
            if(responseStatus === 200) {;
                setCookie("jwt", data.jwt, 1);
                usernameInput.value="";
                passwordInput.value="";
                console.log(getCookie("jwt"));
                window.history.back();
                // location.reload();
            }else if(responseStatus === 400){
                alert("Username or password wrong!");
            }
        })
    }else {
        alert("Please fill in Login From before submit!");
    }
}


