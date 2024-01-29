const firstNameInput = document.querySelector("#first_name");
const lastNameInput = document.querySelector("#last_name");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const genderInput = document.querySelector("#gender");
const dobInput = document.querySelector("#dob");
const emailInput = document.querySelector("#email");
const avatarInput = document.querySelector("#avatar");
const registerBtn = document.querySelector("button#register");

class CreateUserRequest {
  constructor(firstName, lastName, username, password, gender, dob, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.dob = dob;
    this.email = email;
  }
  toString() {
    return `CreateUserRequest(firstName=${this.firstName}, lastName=${this.lastName}, username=${this.username}, password=${this.password}, gender=${this.gender}, email=${this.email}, dob=${this.dob})`;
  }
}

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const gender = genderInput.value;

  const dob = dobInput.value;
  //  Dob in format "dd-MM-yyyy"
  const dobInNewFormat = dob.split("-").reverse().join("-");

  const email = emailInput.value;
  const avatar = avatarInput.files[0];

  console.log(dobInNewFormat);

  console.log("firstName: " + firstName);
  console.log("lastName: " + lastName);
  console.log("username: " + username);
  console.log("password: " + password);
  console.log("gender: " + gender);
  console.log("dob: " + dob);
  console.log("email: " + email);

  const nameRegex = /^[a-z A-Z]+$/;
  const usernameRegex = /^(?=.*[a-zA-Z]).{5,}$/;  // username's min length is 5 and have at least 1 alphabet
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;   // password have at least 8 character, 1 alphabet and 1 number

  let testName = false;
  if(firstName != null && nameRegex.test(firstName) && lastName != null && nameRegex.test(lastName)){
    testName = true;
  }else {
    testName = false;
    alert ("First name and last name can not be empty!");
    return;
  }

  let testUsername = false;
  if(usernameRegex.test(username)){
    testUsername = true;
  }else {
    alert("Username must have at least 5 characters!")
    return;
  }

  let testPassword = false;
  if(passwordRegex.test(password)){
    testPassword = true;
  }else {
    alert("Password must have at least 8 characters, 1 alphabet and 1 digit!");
    return;
  }

  let testGender = false;
  if(gender != null){
    testGender = true;
  }else {
    alert("You must choose your Gender!");
    return;
  }
  console.log("test");

  if(testName && testUsername && testPassword){
    const createUserRequest = new CreateUserRequest(
      firstName,
      lastName,
      username,
      password,
      gender,
      dobInNewFormat,
      email,
      avatar
    );
  
    const createUserRequestJSON = JSON.stringify(createUserRequest);
  
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("createUserRequest", new Blob([createUserRequestJSON], { type: "application/json" }));
  
    fetch("http://localhost:8080/api/accounts/register2", {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log("***");
      console.log(response);
      console.log(response.status);
      console.log("***");
      if (response.ok) {
        alert("Register successfully! Please check your email to active your account!");
        window.location.href="login.html";
        return;
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
    });
  }
});
