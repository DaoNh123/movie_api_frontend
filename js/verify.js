var frontendUrl = window.location.origin;
let backendUrl = "";
if (frontendUrl === "http://127.0.0.1:5500") {
  backendUrl = "http://localhost:8080";
} else {
  backendUrl = frontendUrl + ":8080";
}


let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get("verifyCode"));
console.log(urlParams.get("email"));

const decodedVerifyCode = encodeURIComponent(urlParams.get("verifyCode"));
const decodedEmail = encodeURIComponent(urlParams.get("email"));

console.log("Root URL:", frontendUrl);
console.log("decodedVerifyCode: " + decodedVerifyCode);
console.log("decodedEmail: " + decodedEmail);

const getAPI = (api) => {
  const result = fetch(api)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return result;
};

const verifyAccount = async () => {
  const notifyTag = document.querySelector("#notify");
  console.log(notifyTag);

  const verifyUrl = `${backendUrl}/api/accounts/verify?email=${decodedEmail}&verificationCode=${decodedVerifyCode}`;

  console.log(verifyUrl);

  // getAPI(verifyUrl)
  // .then()
  const result = fetch(verifyUrl)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      return res.json();
    })
    .then((data) => {
      if (typeof data === "string") return data;

      console.log(typeof data);
      console.log("Response:", data);
      console.log("Response:", data.code);
      console.log("Message in response: ", data.message);
      return data.message;
    })
    .then((data) => {
      const notifyTag = document.querySelector("#notify");
      notifyTag.textContent = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return result;
};

verifyAccount();
