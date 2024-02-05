class CreateSlotRequest {
  constructor (startTime, movieId, theaterRoomId){
    this.startTime = startTime;
    this.movieId = movieId;
    this.theaterRoomId = theaterRoomId;
  }
}

const dateOfSlotInput = document.querySelector("input#date-of-slot");
const startTimeOfSlotInput = document.querySelector("input#start-time-of-slot");
const submitBtn = document.querySelector("button#create-slot");

if (!isAdmin) {
  window.location.href = "login.html";
}
// ***********  Start render Option TheaterRoom data
class TheaterRoomResponse {
  constructor(id, theaterRoomName) {
    this.id = id;
    this.theaterRoomName = theaterRoomName;
  }
}

const getTheaterRoomUrl = `${backendUrl}/api/admin/theater-rooms`;
const requestOption = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
};

const renderOptionTheaterRoom = async () => {
  const theaterRoomInput = document.querySelector("select#theater-room");

  let theaterRoomList = [];
  await fetchApiCommon(getTheaterRoomUrl, requestOption, "Render Theater Room Error!", false)
    .then((dataTheaterRoom) => {
      for (const theater of dataTheaterRoom) {
        const theaterRoom = new TheaterRoomResponse(theater.id, theater.theaterRoomName);
        theaterRoomList.push(theaterRoom);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(messageWhenError);
    });

  for (const theaterRoom of theaterRoomList) {
    theaterRoomInput.innerHTML += `
    <option value="${theaterRoom.theaterRoomName}" theater-room-id="${theaterRoom.id}">${theaterRoom.theaterRoomName}</option>
    `;
  }
};

renderOptionTheaterRoom();
// End render Option TheaterRoom data -----------------

// ***************Start render Option Movie data
class MovieResponseOverview {
  constructor(id, movieName, openingTime, closingTime) {
    this.id = id;
    this.movieName = movieName;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }

  setOpeningTime(openingTime) {
    // Assuming ZonedDateTime is a valid date object
    if (openingTime instanceof Date) {
      this.openingTime = openingTime;
    } else {
      throw new Error("Opening time must be a valid Date object");
    }
  }

  setClosingTime(closingTime) {
    // Assuming ZonedDateTime is a valid date object
    if (closingTime instanceof Date) {
      this.closingTime = closingTime;
    } else {
      throw new Error("Closing time must be a valid Date object");
    }
  }
}

dateOfSlotInput.addEventListener("change", (e) => {
  e.preventDefault();
  const chooseMovieInput = document.querySelector("select#choose-movie");

  const dateOfSlot = dateOfSlotInput.value;
  console.log(dateOfSlot);

  const renderOptionMovieUrl = `${backendUrl}/api/admin/movies/listing2?date-of-slot=${dateOfSlot}`;
  const requestOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  };

  fetchApiCommon(renderOptionMovieUrl, requestOption, "", false).then((movieData) => {
    chooseMovieInput.innerHTML = `
    <option value="" default movie-id="" aria-placeholder="">Movie - placeholder </option>
    `;
    for (const movie of movieData) {
      chooseMovieInput.innerHTML += `
      <option value=${movie.movieName} movie-id=${movie.id}>${movie.id} - ${movie.movieName}</option>
      `;
    }
  });
});

// End render Option Movie data -----------------

// ***********  Start set min for Start time

const theaterRoomInput = document.querySelector("select#theater-room");

theaterRoomInput.addEventListener("change", (e) => {
  e.preventDefault();

  const theaterRoomId = theaterRoomInput.options[theaterRoomInput.selectedIndex].getAttribute("theater-room-id");
  const theaterRoomName = theaterRoomInput.options[theaterRoomInput.selectedIndex].value;

  console.log(theaterRoomId);
  if(dateOfSlotInput.value !== "") {
    const findLatestSlotRequest = {
      theaterRoomId: theaterRoomId,
      findingDate: dateOfSlotInput.value,
    };

    const getLatestSlotUrl = `${backendUrl}/api/admin/slots/latest-time-slot`;
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
      body: JSON.stringify(findLatestSlotRequest)
    };

    fetchApiCommon(getLatestSlotUrl, requestOption, "", false)
    .then (data => {
      console.log(data);
      console.log(data.startTime);

      console.log(getTimeInString(data.startTime));
      console.log(getDateInString(data.startTime).getDay());

      console.log(new Date(dateOfSlotInput.value).getDay());

      if(data.endTime !== null && getDateInString(data.endTime).getDay() !== new Date(dateOfSlotInput.value).getDay()) {
        alert(`Can't add more slot at the chosen day because the latest slot at Theater room ${theaterRoomName} will end at ${data.endTime}!`);
      }else {
        let minTime = addMinutesToTimeInString(getTimeInString(data.startTime), 30);
        startTimeOfSlotInput.disabled = true;
        startTimeOfSlotInput.value = minTime;
        console.log(minTime);
      }
    })
  }

});
// End set min for Start time -----------------

// ***********  Start set min, max for input:date

var minTime = "09:00";
var maxTime = "14:59";
startTimeOfSlotInput.value = null;
startTimeOfSlotInput.disabled = true;

//   End set min, max for input:date ---------------------

// ***********  Start set min, max for input:time
let today = new Date();

// Calculate the date 30 days from today
let maxDate = new Date();
maxDate.setDate(today.getDate() + 30);

// Format today's date and the max date in the proper format for the input field
let todayFormatted = today.toISOString().split("T")[0];
let maxDateFormatted = maxDate.toISOString().split("T")[0];

// Set the max and min attributes of the date input field
dateOfSlotInput.setAttribute("max", maxDateFormatted);
dateOfSlotInput.setAttribute("min", todayFormatted);
//   End set min, max for input:time --------------

// ***********Start "Create Slot" Button Event
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const theaterRoomInput = document.querySelector("select#theater-room");
  const chooseMovieInput = document.querySelector("select#choose-movie");

  const dateOfSlot = dateOfSlotInput.value;
  const theaterRoomId = theaterRoomInput.options[theaterRoomInput.selectedIndex].getAttribute("theater-room-id");
  const movieId = chooseMovieInput.options[chooseMovieInput.selectedIndex].getAttribute("movie-id");
  const startTimeOfSlot = startTimeOfSlotInput.value;

  console.log("dateOfSlot: " + dateOfSlot);
  console.log("theaterRoomId: " + theaterRoomId);
  console.log("movieId: " + movieId);
  console.log("startTimeOfSlot: " + startTimeOfSlot);

  console.log(toZonedDateTime(dateOfSlot, startTimeOfSlot));

  const createSlotRequest = new CreateSlotRequest(
    toZonedDateTime(dateOfSlot, startTimeOfSlot),
    movieId,
    theaterRoomId,
  )

  const createSlotUrl = `${backendUrl}/api/admin/slots`;
  const createSlotOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    body: JSON.stringify(createSlotRequest)
  };

  fetchApiCommon(createSlotUrl, createSlotOption, "Create Slot fail!", true)
  .then(data => {
    alert(`A slot of Movie ${data.movie.movieName} have been created at ${data.startTime}`);
  })
});
// End "Create Slot" Button Event-----------------------

// ***********Start "Create Slot" Button Event