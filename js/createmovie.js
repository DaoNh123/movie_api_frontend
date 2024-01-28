var frontendUrl = window.location.origin;
let backendUrl = "";
if (frontendUrl === "http://127.0.0.1:5500") {
  backendUrl = "http://localhost:8080";
} else {
  backendUrl = frontendUrl + ":8080";
}


// Format the dates using Intl.DateTimeFormat
const openingTime = new Date('2023-12-21T11:11:00');

const closingTime = new Date('2023-12-21T11:11:00');
class CreateMovieRequest {
  constructor(movieName, language, openingTime, closingTime) {
    this.movieName = movieName;
    this.language = language;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }
}

let submitBtn = document.getElementById("btnSubmit");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault;

    const createMovieRequestJson = JSON.stringify(new CreateMovieRequest("Movie 1 from createMovie.js", "en", openingTime, closingTime));

  const posterFileInput = document.getElementById("posterFileInput"); // Replace with the actual ID of your file input
  const posterFile = posterFileInput.files[0];

  const formData = new FormData();
  formData.append('poster', posterFile);
  
  // Append the JSON string as a blob with the desired Content-Type
  formData.append('createMovieRequest', new Blob([createMovieRequestJson], { type: 'application/json' }));
  
  // Make the POST request using fetch
  fetch("http://localhost:8080/api/movies", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Assuming the response is in JSON format
    })
    .then((data) => {
      // Handle the response data
      console.log("Response data:", data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
});
