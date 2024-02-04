const frontendUrl = window.location.origin;
console.log(frontendUrl);

let backendUrl = "";
if (frontendUrl === "http://127.0.0.1:5500") {
  backendUrl = "http://localhost:8080";
} else {
  backendUrl = frontendUrl + ":8080";
}

// **** Start Drop down JS
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
// End Drop down JS __________

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
const dropdownContentTag = document.querySelector("div#myDropdown");
const btnContainerNavbarLeft = document.querySelector("div#btn-container-navbar-left");
console.log(dropdownContentTag);

if(btnContainerNavbarLeft){
  if (checkCookieExists("jwt")) {
    if (isAdmin == true) {
      dropdownContentTag.innerHTML += `<a href="createmovie.html" id="log-in">Create Movie</a>`;
  
      dropdownContentTag.innerHTML += `<a href="createSlot.html" id="log-in">Create Slot</a>`;
    }
  
    let logoutBtn = document.createElement("button");
    logoutBtn.id = "log-out";
    logoutBtn.innerText = "LOG OUT";
  
    console.log(logoutBtn);
    logoutBtn.addEventListener("click", (e) => {
      eraseCookie("jwt");
      eraseCookie("userDto");
  
      location.reload();
    });
    btnContainerNavbarLeft.appendChild(logoutBtn);
    dropdownContentTag.innerHTML += `
    <a href="listingUserOrder.html" id="log-in">Order List</a>
    `;

  
    if (pathName.endsWith("login.html")) {
      window.location.href = "index.html";
    }
  } else {
    dropdownContentTag.innerHTML += `<a href="login.html"  id="log-in">LOG IN</a>`;
  }
}

console.log(pathName.endsWith("createmovie.html"));
if (pathName.endsWith("createmovie.html") && !isAdmin) {
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
const fetchApiCommon = async (apiUrl, requestOption, messageWhenError, isAlertSuccess) => {
  let responseStatus = 0;
  // POST new Movie
  const data = await fetch(apiUrl, requestOption)
    .then((response) => {
      responseStatus = response.status;
      console.log(responseStatus);
      return response.json();
    })
    .then((data) => {
      if (responseStatus === 200) {
        console.log("Response data:", data);
        if (isAlertSuccess) alert("Successfully!");
        return data;
      } else {
        console.log(data.message);
        alert("Error: " + data.message);
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(messageWhenError);
    });
  return data;
};

const toZonedDateTime = (dateStr, timeStr) => {
  const combinedDateTimeStr = `${dateStr}T${timeStr}:00`;

  // Create a Date object with combined date and time
  const dateTime = new Date(combinedDateTimeStr);

  // Get the ISO 8601 formatted date-time string
  const isoDateTimeStr = dateTime.toISOString();
  // Append 'Z' for UTC if needed
  const isoDateTimeWithZone = isoDateTimeStr.replace("Z", "+0000");

  console.log(isoDateTimeWithZone);
  return isoDateTimeWithZone;
};

const getTimeInString = (zonedDateTimeString) => {
  const zonedDateTime = new Date(zonedDateTimeString);

  const hour = zonedDateTime.getHours().toString().padStart(2, "0");
  const minute = zonedDateTime.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
};

const addMinutesToTimeInString = (timeString, addMinutes) => {
  const [hours, minutes] = timeString.split(":").map(Number);

  // Add 30 minutes
  let newMinutes = minutes + addMinutes;
  let newHours = hours;

  // Handle overflow if adding 30 minutes pushes the time past 59 minutes
  if (newMinutes >= 60) {
    newHours += Math.floor(newMinutes / 60);
    newMinutes %= 60;
  }

  // Format new hours and minutes
  newHours = String(newHours).padStart(2, "0");
  newMinutes = String(newMinutes).padStart(2, "0");

  // Construct the new time string
  return `${newHours}:${newMinutes}`;
};

const getDateInString = (zonedDateTimeString) => {
  const year = parseInt(zonedDateTimeString.substr(0, 4));
  const month = parseInt(zonedDateTimeString.substr(5, 2)) - 1; // Months are zero-based
  const day = parseInt(zonedDateTimeString.substr(8, 2));

  // Create a Date object with the extracted components
  const date = new Date(year, month, day);

  return date;
};

// const getTodayAtZone = (zone) => {
//   // Get the current date
//   let today = new Date();

//   // Set the offset for UTC+7 (in minutes)
//   const offset = zone * 60; // -7 hours * 60 minutes

//   // Adjust the time based on the offset
//   today = new Date(today.getTime() + offset * 60000); // Adding offset in milliseconds

//   return today;
// };
