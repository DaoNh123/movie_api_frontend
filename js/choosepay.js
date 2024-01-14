// CHOICE SEAT
document.addEventListener('DOMContentLoaded', function () {
  var seats = document.querySelectorAll('.seat, .vip');
  seats.forEach(function (seat) {
      seat.addEventListener('click', function () {
          if (!seat.classList.contains('occupied')) {
              seat.classList.toggle('selected');
          }
      });
  });
});

  // NOTIFICATION TO PAYMENT FORM
  function showNotification() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("notification").classList.remove("hidden");
  }
  
  function hideNotification() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("notification").classList.add("hidden");
  }


// Fetch API data
let urlParams = new URLSearchParams(window.location.search);
let movieId = decodeURIComponent(urlParams.get("id"));
// Fetch API data
fetch(`http://localhost:8080/api/slots/${movieId}`)
  .then((response) => response.json())
  .then((seatData) => {
    if (!Array.isArray(seatData)) {
      throw new Error("Invalid seat data");
    }

    const movieSeatElements = document.querySelectorAll(".seat-container");

    movieSeatElements.forEach((movieSeatElement) => {
      const showcase = movieSeatElement.querySelector(".showcase");

      seatData.forEach((seat) => {
        const li = document.createElement("li");
        const seatDiv = document.createElement("div");
        const seatNameP = document.createElement("p");

        seatDiv.classList.add("seat");
        seatDiv.classList.add(seat.status);
        seatNameP.textContent = seat.seatName;

        if (seat.status === "AVAILABLE") {
          seatNameP.textContent += `: ${seat.seatClass.price} VND`;
        }

        li.appendChild(seatDiv);
        li.appendChild(seatNameP);
        showcase.appendChild(li);
      });
    });

    // Additional code to handle the rendering of booked seats
    const rowElement = document.querySelector(".row");

    seatData.forEach((seat) => {
      if (seat.status === "BOOKED") {
        const seatDiv = document.createElement("div");
        seatDiv.classList.add("seat");
        seatDiv.classList.add("booked");
        seatDiv.textContent = seat.seatName;

        rowElement.appendChild(seatDiv);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching seat data:", error);
  });


  // // test2
  let getApi = async (apiLink) => {
    const response = await fetch(apiLink);
    const data = await response.json();
    return data;
  };
  
  class SeatClass {
    constructor(seatClassName, price) {
      this.seatClassName = seatClassName;
      this.price = price;
    }
  }
  
  class Seat {
    constructor(seatId, seatName, status, seatClass) {
      this.seatId = seatId;
      this.seatName = seatName;
      this.row = seatName[0];
      this.column = seatName.slice(1);
      this.status = status;
      this.seatClass = new SeatClass(seatClass.seatClassName, seatClass.price);
    }
    toString() {
      return `Seat ID: ${this.seatId}
      Seat Name: ${this.seatName}
      Status: ${this.status}
      Row: ${this.row}
      Column: ${this.column}
      Seat Class Name: [
        seatClassName: ${this.seatClass.seatClassName}
        price: ${this.seatClass.price}
      ]`;
    }
  }
  
  
  let getMapRowSeat = async () => {
    return getApi("http://localhost:8080/api/slots/${movieId}")
      .then((data) => {
        return data.map((seat) => new Seat(seat.seatId, seat.seatName, seat.status, seat.seatClass));
      })
      .then((listSeat) => {
        const seatMap = new Map();
  
        listSeat.forEach((seat) => {
          const key = seat.row;
          if (!seatMap.has(key)) {
            seatMap.set(key, []);
          }
          seatMap.get(key).push(seat);
        });
  
        console.log(seatMap);
        return seatMap;
      });
  };
  
  getMapRowSeat()
  .then(mapRowSeat => {
    let rows = mapRowSeat.keys();
    for (const row of rows) {
      console.log(row);
      
      let seatsInRow = mapRowSeat.get(row);
      console.log(seatsInRow);
    
    }
  });
