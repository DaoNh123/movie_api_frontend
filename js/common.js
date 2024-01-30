const frontendUrl = window.location.origin;

let backendUrl = "";
if (frontendUrl === "http://127.0.0.1:5500") {
  backendUrl = "http://localhost:8080";
} else {
  backendUrl = frontendUrl + ":8080";
}

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires ;
}

//Get a cookie
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

// Function to delete a cookie
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function checkCookieExists(name) {
  var cookieValue = getCookie(name);
  return cookieValue !== undefined && cookieValue !== "";
}

const rememberMeInput = document.querySelector("input.remember-me-input");
const logoutBtn = document.querySelector("button#log-out");
const loginBtn = document.querySelector("a#log-in");

if(checkCookieExists("jwt")){
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";

    if(window.location.pathname.endsWith("login.html")){
        window.location.href = "index.html";
    }else {

    }
} else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
}

logoutBtn.addEventListener("click", (e) => {
  eraseCookie("jwt");
  eraseCookie("userDto");

  location.reload();
})

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
    if(this.lastName !== null) this.fullName += " " + this.lastName;
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

// if(checkCookieExists("userDto")){
//   let userDto = new UserDto(getCookie("userDto"));
//   console.log(userDto.firstName);
//   console.log(userDto.lastName);
//   console.log(userDto.username);
//   console.log(userDto.gender);
//   console.log(userDto.email);
//   console.log(userDto.dob);
//   console.log(userDto.avatarUrl);
// }

// Test "jwt" claim "isAdmin"
function decodeToken(token) {
  const parts = token.split('.');
  const decoded = {};

  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  decoded.header = JSON.parse(atob(parts[0]));
  decoded.payload = JSON.parse(atob(parts[1]));

  return decoded;
}

const decodedToken = decodeToken(getCookie("jwt"));
const isAdmin = decodedToken.payload.isAdmin;

console.log("isAdmin:", isAdmin);