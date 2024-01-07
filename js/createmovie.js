// const form = document.querySelector('form');

// form.addEventListener('submit', (event) => {
//   console.log('Submitting');
//   event.preventDefault();

//   const formData = new FormData(form);
//   const jsonData = JSON.stringify(Object.fromEntries(formData));

//   debugger;

//   fetch('http://localhost:8080/api/movies/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//        Accept: "application/json",
//     },
//     body: jsonData
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log(data)
//   })
//   .catch(error => console.log(error));

//   form.reset();
// });

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const movieName = document.querySelector(".movieName input").value;
  const language = document.querySelector(".language select").value;
  const posterFile = document.querySelector(".poster input").files[0];
  const duration = document.querySelector(".duration input").value;
  const imdbRatings = document.querySelector(".imdbRatings input").value;
  const movieLabel = document.querySelector(".movieLabel select").value;
  const iframe = document.querySelector(".iframe input").value;
  const openingTime = document.querySelector(".openingTime input").value;
  const closingTime = document.querySelector(".closingTime input").value;
  const categoryList = document.querySelector(".categoryList input").value;
  const description = document.querySelector(".description input").value;

  const formData = new FormData();
  formData.append("movieName", movieName);
  formData.append("language", language);
  formData.append("poster", posterFile);
  formData.append("duration", duration);
  formData.append("imdbRatings", imdbRatings);
  formData.append("movieLabel", movieLabel);
  formData.append("iframe", iframe);
  formData.append("openingTime", openingTime);
  formData.append("closingTime", closingTime);
  formData.append("categoryList", categoryList);
  formData.append("description", description);

  // debugger;

  fetch("http://localhost:8080/api/movies", {
    method: "POST",
    body: formData,
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      console.log("Response data:", data);
    })
    .catch(function(error) {
      console.error("Error:", error);
    });
    
});