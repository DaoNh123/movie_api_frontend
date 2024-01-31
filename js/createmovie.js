class CreateMovieRequest {
  constructor(
    movieName,
    imdbId,
    posterUrl,
    posterUrlInMovieDB,
    description,
    duration,
    language,
    openingTime,
    closingTime,
    categoryList,
    youtubeLink,
    movieLabel
  ) {
    this.movieName = movieName;
    this.imdbId = imdbId, 
    this.posterUrl = posterUrl,
    this.posterUrlInMovieDB = posterUrlInMovieDB,
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
  posterUrl: ${this.posterUrl},
  posterUrlInMovieDB: ${this.posterUrlInMovieDB},
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
// Find Object in HTML
const movieNameInput = document.querySelector(".movieName input");
const imdbIdInput = document.querySelector(".imdb_id input");
const descriptionInput = document.querySelector(".description input");
const durationInput = document.querySelector(".duration input");
const languageInput = document.querySelector(".language select");
const openingTimeInStringInput = document.querySelector(".openingTime input");
const closingTimeInStringInput = document.querySelector(".closingTime input");
const categoryListInStringInput = document.querySelector(".categoryList input");
const youtubeLinkInput = document.querySelector(".youtubeLink input");
const movieLabelInput = document.querySelector(".movieLabel select");

const categoryListCheckbox = document.querySelectorAll('.categoryForm input[type="checkbox"]');

// End find Object in HTML

// Start autoFill data for the "CreateMovie" Form
const autoFillDataBtn = document.querySelector("button#auto-fill-data");
const imageAutoFill = document.querySelector("img#image-auto-fill");

autoFillDataBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const imdbId = imdbIdInput.value;

  const autoFillUrl = `${backendUrl}/api/admin/movies/autofill-data/${imdbId}`;
  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  };
  let createMovieRequestAutoFill;

  console.log(autoFillUrl);
  let responseStatus = 0;
  fetch(autoFillUrl, requestOption)
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((data) => {
      if(responseStatus === 200) {
        console.log(data.movieName);
      }else {
        alert(data.message);
      }
      createMovieRequestAutoFill = new CreateMovieRequest(
        data.movieName,
        data.imdbId,
        data.posterUrl,
        data.posterUrlInMovieDB,
        data.description,
        data.duration,
        data.language,
        data.openingTime,
        data.closingTime,
        data.categoryList,
        data.youtubeLink,
        data.movieLabel
      );

      movieNameInput.value = createMovieRequestAutoFill.movieName;
      imdbIdInput.value = createMovieRequestAutoFill.imdbId;
      descriptionInput.value = createMovieRequestAutoFill.description;
      durationInput.value = createMovieRequestAutoFill.duration;
      languageInput.value = createMovieRequestAutoFill.language;
      openingTimeInStringInput.value = createMovieRequestAutoFill.openingTime.split("T")[0];

      for (const item of categoryListCheckbox) {
        if(createMovieRequestAutoFill.categoryList.includes(item.value)){
          item.checked = true;
        }
      }
      updateDataInCategoryInput();

      youtubeLinkInput.value = createMovieRequestAutoFill.youtubeLink;
      movieLabelInput.value = createMovieRequestAutoFill.movieLabel;

      imageAutoFill.src = createMovieRequestAutoFill.posterUrlInMovieDB;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });;


});
// End autoFill data for the "CreateMovie" Form

let submitBtn = document.querySelector("#btnSubmit");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const movieName = movieNameInput.value;
  const imdbId = imdbIdInput.value;
  const description = descriptionInput.value;
  const duration = durationInput.value;
  const language = languageInput.value;
  const openingTimeInString = openingTimeInStringInput.value.concat("T00:00:00");
  const closingTimeInString = closingTimeInStringInput.value.concat("T00:00:00");
  const categoryListInString = categoryListInStringInput.value;
  const youtubeLink = youtubeLinkInput.value;
  const movieLabel = movieLabelInput.value;

  const openingTime = new Date(openingTimeInString);
  const closingTime = new Date(closingTimeInString);

  const posterFileInput = document.getElementById("posterFileInput");
  const posterFile = posterFileInput.files[0];

  console.log(posterFile);
  console.log(imageAutoFill.src);

  function checkForNullValues() {
    // Define an array to store variables with null values
    const nullVariables = [];
  
    // Check each variable for null value
    if (movieName === null || movieName === "") {
      nullVariables.push("movieName");
    }
    if (imdbId === null || imdbId === "") {
      nullVariables.push("imdbId");
    }
    if (description === null || description === "") {
      nullVariables.push("description");
    }
    if (duration === null || duration === "") {
      nullVariables.push("duration");
    }
    if (language === null || language === "") {
      nullVariables.push("language");
    }
    if (openingTimeInString === null || openingTimeInString === "") {
      nullVariables.push("openingTimeInString");
    }
    if (closingTimeInString === null || closingTimeInString === "") {
      nullVariables.push("closingTimeInString");
    }
    if (categoryListInString === null || categoryListInString === "") {
      nullVariables.push("categoryListInString");
    }
    if (youtubeLink === null || youtubeLink === "") {
      nullVariables.push("youtubeLink");
    }
    if (movieLabel === null || movieLabel === "") {
      nullVariables.push("movieLabel");
    }
    if (openingTime === null || isNaN(openingTime.getTime())) {
      nullVariables.push("openingTime");
    }
    if (closingTime === null || isNaN(closingTime.getTime())) {
      nullVariables.push("closingTime");
    }
    if (posterFile === null) {
      nullVariables.push("posterFile");
    }
  
    // Check if any variables have null values
    if (nullVariables.length > 0) {
      alert("The following variables contain null values:");
      alert(nullVariables);
      return true; // Indicates presence of null values
    } else {
      console.log("All variables contain valid values.");
      return false; // Indicates absence of null values
    }
  }
  
  // Call the function to check for null values
  if(checkForNullValues()) return;

  const categoryList = categoryListInString.split(",").map((category) => category.trim());
  console.log(categoryList);
  const createMovieRequestJson = JSON.stringify(
    new CreateMovieRequest(
      movieName,
      imdbId,
      null,
      imageAutoFill.src,
      description,
      duration,
      language,
      openingTime,
      closingTime,
      categoryList,
      youtubeLink,
      movieLabel
    )
  );

  console.log(createMovieRequestJson);
  // return;

  const formData = new FormData();
  console.log(posterFile);
  if (posterFile !== undefined) formData.append("poster", posterFile);
  formData.append("createMovieRequest", new Blob([createMovieRequestJson], { type: "application/json" }));

  const createMovieUrl = `${backendUrl}/api/admin/movies`;
  const requestOption = {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    body: formData,
  };


  fetchApiCommon(createMovieUrl, requestOption, "An error occurred while trying to add the movie.");
});

//categoryForm checkbox
document.querySelectorAll('.categoryForm input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    e.preventDefault();

    updateDataInCategoryInput();
  });
});

const updateDataInCategoryInput = () => {
  const selectedOptions = Array.from(document.querySelectorAll('.categoryForm input[type="checkbox"]:checked')).map(
    (checkbox) => checkbox.value
  );

  const input = document.querySelector(".input_box.categoryList input");
  input.value = selectedOptions.join(", ");
}


// categoryForm checkbox
document.querySelectorAll('.categoryForm input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selectedOptions = Array.from(document.querySelectorAll('.categoryForm input[type="checkbox"]:checked')).map(
      (checkbox) => checkbox.value
    );

    const input = document.querySelector(".input_box.categoryList input");
    input.value = selectedOptions.join(", ");
  });
});
