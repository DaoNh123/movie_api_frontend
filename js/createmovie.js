
class CreateMovieRequest {
  constructor(movieName, language, duration, imdbRatings,movieLabel,iframe,openingTime,closingTime,categoryList,description) {
    this.movieName = movieName;
    this.language = language;
    this.duration =duration;
    this.imdbRatings = imdbRatings;
    this.movieLabel = movieLabel;
    this.iframe = iframe;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.categoryList =categoryList;
    this.description=description;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let submitBtn = document.querySelector("btnSubmit"); 

  if (submitBtn) { 
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
    });
 
  const createMovieRequestJson = JSON.stringify(new CreateMovieRequest(movieName, language, duration, imdbRatings,movieLabel,iframe,openingTime,closingTime,categoryList,description));

  const posterFileInput = document.getElementById("posterFileInput"); 
  const posterFile = posterFileInput.files[0];
  const movieName = document.querySelector(".movieName input").value;
  const language = document.querySelector(".language select").value;
  // const posterFile = document.querySelector(".poster input").files[0];
  const duration = document.querySelector(".duration input").value;
  const imdbRatings = document.querySelector(".imdbRatings input").value;
  const movieLabel = document.querySelector(".movieLabel select").value;
  const iframe = document.querySelector(".iframe input").value;
  const openingTime = document.querySelector(".openingTime input").value;
  const closingTime = document.querySelector(".closingTime input").value;
  const categoryList = document.querySelector(".categoryList input").value;
  const description = document.querySelector(".description input").value;

  const formData = new FormData();
  formData.append('poster', posterFile);
  //debugger;
  
  formData.append('createMovieRequest', new Blob([createMovieRequestJson], { type: 'application/json' }));
  
  fetch("http://localhost:8080/api/movies", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      return response.json(); 
    })
    .then((data) => {
    
      console.log("Response data:", data);
    })
    .catch((error) => {

      console.error("Error:", error);
    });
  };
});
