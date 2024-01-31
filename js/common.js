const frontendUrl = window.location.origin;

let backendUrl = "";
if (frontendUrl === "http://127.0.0.1:5500") {
  backendUrl = "http://localhost:8080";
} else {
  backendUrl = frontendUrl + ":8080";
}

function setCookie(cName, cValue, expHours) {
  let date = new Date();
  date.setTime(date.getTime() + expHours * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires;
}

//Get a cookie
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

// Function to delete a cookie
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

function checkCookieExists(name) {
  var cookieValue = getCookie(name);
  return cookieValue !== undefined && cookieValue !== "";
}

const rememberMeInput = document.querySelector("input.remember-me-input");
const pathName = window.location.pathname;

// Test "jwt" claim "isAdmin"
function decodeToken(token) {
  const parts = token.split(".");
  const decoded = {};

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  decoded.header = JSON.parse(atob(parts[0]));
  decoded.payload = JSON.parse(atob(parts[1]));

  return decoded;
}
let isAdmin = false;

if (checkCookieExists("jwt")) {
  const decodedToken = decodeToken(getCookie("jwt"));
  isAdmin = decodedToken.payload.isAdmin;
}

console.log("isAdmin:", isAdmin);

//  Handle Button "Log in", "Log out" in Navbar
const btnContainerNavbarLeft = document.querySelector("div#btn-container-navbar-left");

if (checkCookieExists("jwt")) {
  if (isAdmin == true) {
    btnContainerNavbarLeft.innerHTML += `<a href="createmovie.html" class="btn" id="log-in">Create Movie</a>`;
  }

  let logoutBtn = document.createElement("button");
  logoutBtn.classList.add("btn");
  logoutBtn.id = "log-out";
  logoutBtn.innerText = "LOG OUT";

  logoutBtn.addEventListener("click", (e) => {
    eraseCookie("jwt");
    eraseCookie("userDto");
  
    location.reload();
  });
  btnContainerNavbarLeft.appendChild(logoutBtn);

  if (pathName.endsWith("login.html")) {
    window.location.href = "index.html";
  }
} else {
  btnContainerNavbarLeft.innerHTML += `<a href="login.html" class="btn" id="log-in">LOG IN</a>`;
}

console.log(pathName.endsWith("createmovie.html"));
if (pathName.endsWith("createmovie.html") && !isAdmin){
  alert("Only admin can access this page!");
  window.location.href = "index.html";
}

class UserDto {
  constructor(userDtoJSON) {
    let userDto = JSON.parse(userDtoJSON);

    this.firstName = userDto.firstName;
    this.lastName = userDto.lastName;
    this.username = userDto.username;
    this.gender = userDto.gender;
    this.email = userDto.email;
    this.dob = userDto.dob;
    this.avatarUrl = userDto.avatarUrl;
    this.fullName = this.firstName;
    if (this.lastName !== null) this.fullName += " " + this.lastName;
  }
  toString() {
    return `UserDto {
  firstName: ${this.firstName},
  lastName: ${this.lastName},
  username: ${this.username},
  gender: ${this.gender},
  email: ${this.email},
  dob: ${this.dob},
  avatarUrl: ${this.avatarUrl},
  fullName: ${this.fullName}
}`;
  }
}

// api fetch
const fetchApiCommon = (apiUrl, requestOption, messageWhenError) => {
  let responseStatus = 0;
  // POST new Movie
  fetch(apiUrl, requestOption)
    .then((response) => {
      responseStatus = response.status;
      console.log(responseStatus);
      return response.json();
    })
    .then((data) => {
      if (responseStatus === 200) {
        console.log("Response data:", data);
        alert("Successfully!");
      } else {
        console.log(data.message);
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(messageWhenError);
    });
}