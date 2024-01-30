class CreateMovieRequest {
  constructor(
    movieName,
    imdbId,
    description,
    duration,
    language,
    openingTime,
    closingTime,
    categoryList,
    youtubeLink,
    movieLabel,
  ) {
    this.movieName = movieName;
    this.imdbId = imdbId,
    this.description = description;
    this.duration = duration;
    this.language = language;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.youtubeLink = youtubeLink;
    this.categoryList = categoryList;
    this.movieLabel = movieLabel;
  }

  toString() {
    return `CreateMovieRequest {
  movieName: ${this.movieName},
  imdbId: ${this.imdbId},
  language: ${this.language},
  duration: ${this.duration},
  movieLabel: ${this.movieLabel},
  iframe: ${this.iframe},
  openingTime: ${this.openingTime},
  closingTime: ${this.closingTime},
  categoryList: ${JSON.stringify(this.categoryList)},
  description: ${this.description}
}`;
  }
}


let submitBtn = document.querySelector("#btnSubmit");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const movieName = document.querySelector(".movieName input").value;
  const imdbId = document.querySelector(".imdb_id input").value;
  const description = document.querySelector(".description input").value;
  const duration = document.querySelector(".duration input").value;
  const language = document.querySelector(".language select").value;
  const openingTimeInString = document.querySelector(".openingTime input").value;
  const closingTimeInString = document.querySelector(".closingTime input").value.concat("T00:00:00");
  const categoryListInString = document.querySelector(".categoryList input").value.concat("T00:00:00");
  const youtubeLink = document.querySelector(".youtubeLink input").value;
  const movieLabel = document.querySelector(".movieLabel select").value;

  const openingTime = new Date(openingTimeInString);
  const closingTime = new Date(closingTimeInString);

  const posterFileInput = document.getElementById("posterFileInput");
  const posterFile = posterFileInput.files[0];
  // const posterFile = document.querySelector(".poster input").files[0];
  // const imdbRatings = document.querySelector(".imdbRatings input").value;

  const categoryList = categoryListInString.split(",").map((category) => category.trim());
  console.log(categoryList);
  const createMovieRequestJson = JSON.stringify(
    new CreateMovieRequest(
      movieName,
      imdbId,
      description,
      duration,
      language,
      openingTime,
      closingTime,
      categoryList,
      youtubeLink,
      movieLabel,
    )
  );

  console.log(createMovieRequestJson);
  return;

  const formData = new FormData();
  formData.append("poster", posterFile);
  //debugger;

  formData.append("createMovieRequest", new Blob([createMovieRequestJson], { type: "application/json" }));

  const createMovieUrl = `${backendUrl}/api/admin/movies`;
  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    body: formData,
  }

  fetch(createMovieUrl, requestOption)
    .then((response) => {
      console.log("***");
      console.log(response);
      console.log(response.status);
      console.log("***");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      alert("Successfull!");
    })
    .catch((error) => {
      
      console.error("Error:", error);
      alert("An error occurred while trying to add the movie.");
    });
});

//categoryForm checkbox
document.querySelectorAll('.categoryForm input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    e.preventDefault();

    const selectedOptions = Array.from(document.querySelectorAll('.categoryForm input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);

    const input = document.querySelector('.input_box.categoryList input');
    input.value = selectedOptions.join(', ');
  });
});


// categoryForm checkbox
document.querySelectorAll('.categoryForm input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedOptions = Array.from(document.querySelectorAll('.categoryForm input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);

    const input = document.querySelector('.input_box.categoryList input');
    input.value = selectedOptions.join(', ');
  });
});


// Format the dates using Intl.DateTimeFormat
// const openingTime = new Date('2023-12-21T11:11:00');

// const closingTime = new Date('2023-12-21T11:11:00');
// class CreateMovieRequest {
//   constructor(movieName, language, openingTime, closingTime) {
//     this.movieName = movieName;
//     this.language = language;
//     this.openingTime = openingTime;
//     this.closingTime = closingTime;
//   }
// }

// let submitBtn = document.getElementById("btnSubmit");

// submitBtn.addEventListener("click", (e) => {
//     e.preventDefault;

//     const createMovieRequestJson = JSON.stringify(new CreateMovieRequest("Movie 1 from createMovie.js", "en", openingTime, closingTime));

//   const posterFileInput = document.getElementById("posterFileInput"); // Replace with the actual ID of your file input
//   const posterFile = posterFileInput.files[0];

//   const formData = new FormData();
//   formData.append('poster', posterFile);
  
//   // Append the JSON string as a blob with the desired Content-Type
//   formData.append('createMovieRequest', new Blob([createMovieRequestJson], { type: 'application/json' }));
  
//   // Make the POST request using fetch
//   fetch("http://localhost:8080/api/movies", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json(); // Assuming the response is in JSON format
//     })
//     .then((data) => {
//       // Handle the response data
//       console.log("Response data:", data);
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error("Error:", error);
//     });
// });