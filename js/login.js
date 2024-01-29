class LoginRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  toString() {
    return `LoginRequest { username: ${this.username}, password: ${this.password} }`;
  }
}

class UserData {
  constructor(jwt, userDto) {
    this.jwt = jwt;
    this.userDto = userDto;
  }

  get firstName() {
    return this.userDto.firstName;
  }

  get lastName() {
    return this.userDto.lastName;
  }

  get username() {
    return this.userDto.username;
  }

  get gender() {
    return this.userDto.gender;
  }

  get email() {
    return this.userDto.email;
  }

  get dob() {
    return this.userDto.dob;
  }

  get avatarUrl() {
    return this.userDto.avatarUrl;
  }
}

const usernameInput = document.querySelector("input.username_input");
const passwordInput = document.querySelector("input.password_input");

const loginAction = (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username.trim() !== "" && password.trim() !== "") {
    console.log(username + " " + password);
    let loginRequest = new LoginRequest(username, password);

    console.log(loginRequest);
    let responseStatus = 0;

    let loginUrl = `${backendUrl}/api/accounts/login`;
    fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
    })
      .then((res) => {
        console.log(res.status);
        responseStatus = res.status;
        return res.json();
      })
      .then((data) => {
        console.log(rememberMeInput.checked);

        if (responseStatus === 200) {
          const userData = new UserData(data.jwt, data.userDto);

          console.log(userData.firstName); // Output: admin
          console.log(userData.lastName); // Output: null
          console.log(userData.username); // Output: admin
          console.log(userData.gender); // Output: null
          console.log(userData.email); // Output: nhdao.it2.learn@gmail.com
          console.log(userData.dob); // Output: null
          console.log("Avatar" + userData.avatarUrl);

          setCookie("jwt", data.jwt, 1);

          setCookie("firstName", userData.firstName);
          setCookie("lastName", userData.lastName);
          setCookie("username", userData.username);
          setCookie("gender", userData.gender);
          setCookie("email", userData.email);
          setCookie("dob", userData.dob);
          setCookie("avatarUrl", userData.avatarUrl);

          console.log(getCookie("avatarUrl"));

          usernameInput.value = "";
          passwordInput.value = "";
          console.log(getCookie("jwt"));
          window.history.back();
          // location.reload();
        } else if (responseStatus === 400) {
          alert("Username or password wrong!");
        }
      });
  } else {
    alert("Please fill in Login From before submit!");
  }
};
