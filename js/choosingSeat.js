
let getApi = async (apiLink) => {
  const response = await fetch(apiLink);
  const data = await response.json();
  return data;
};
// Handling choosing Slot View
class SlotResponse {
  constructor(id, startTime, endTime, theaterRoom) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.theaterRoom = theaterRoom;

    // Extracting hour and minute from startTime
    const [datePart, timePart] = startTime.split("@");
    this.date = datePart;

    const [hour, minute] = timePart.split(":");
    this.startTimeWithinDay = `${hour}:${minute}`;
  }

  toString() {
    return `SlotResponse(id=${this.id}, startTime=${this.startTime}, endTime=${this.endTime}, theaterRoom=${this.theaterRoom})`;
  }
}

class OverallResponse {
  constructor(resultSize, slotResponses) {
    this.resultSize = resultSize;
    this.slotResponses = slotResponses.map(
      (slot) => new SlotResponse(slot.id, slot.startTime, slot.endTime, slot.theaterRoom)
    );
  }

  toString() {
    return `OverallResponse(resultSize=${this.resultSize}, slotResponses=[${this.slotResponses
      .map((slot) => slot.toString())
      .join(", ")}])`;
  }
}

let getMovieId = async () => {
  let urlParams = await new URLSearchParams(window.location.search);
  let movieId = await decodeURIComponent(urlParams.get("movie-id"));
  return movieId;
};

// let getSlotsByMovieId = async () => {
//   let movieId = await getMovieId();
//   let slotResponse = await getApi(`http://localhost:8080/api/movies/${movieId}/slots`)
//     .then((data) => new OverallResponse(data.resultSize, data.slotResponses))
//     .then((res) => {
//       console.log(res);
//       return res;
//     });

//   return slotResponse.slotResponses;
// };

let getSlotsByMovieId = async () => {
  let movieId = await getMovieId();
  let slotResponse = await getApi(`http://localhost:8080/api/movies/${movieId}/slots`)
    .then((data) => new OverallResponse(data.resultSize, data.slotResponses ?? []))
    .then((res) => {
      console.log(res);
      return res;
    });
    return slotResponse.slotResponses;
};




let slotResponsesArray = async () => {
  return getSlotsByMovieId().then((slotList) => {
    return slotList;
  });
};

// Convert the array to a Map with day of startTime as the key
const slotResponsesMap = async () => {
  return slotResponsesArray().then((slotResponsesArray) => {
    return slotResponsesArray.reduce((map, slotResponse) => {
      const unsolvedDay = slotResponse.startTime.split("@")[0];

      const inputDate = new Date(unsolvedDay);

      // Format the Date object as a new string
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      const day = inputDate.toLocaleDateString("en-GB", options);

      // Extracting the day part
      if (!map.has(day)) {
        map.set(day, []);
      }
      map.get(day).push(slotResponse);
      return map;
    }, new Map());
  });
};

// Log the resulting Map
slotResponsesMap().then((map) => console.log(map));
slotResponsesMap().then((slotResponsesMap) => {
  let selectDayTag = document.querySelector("select#day");

  const defaultOptionTag = document.createElement("option");
  defaultOptionTag.value = "#";
  selectDayTag.appendChild(defaultOptionTag);

  for (const date of slotResponsesMap.keys()) {
    const optionTag = document.createElement("option");
    optionTag.setAttribute("date", date);
    optionTag.innerText = date;

    selectDayTag.appendChild(optionTag);
  }

  selectDayTag.addEventListener("change", (e) => {
    const chosenDate = selectDayTag.value;
    const choosingTimeSelectTag = document.querySelector("#choosing-time");

    console.log(choosingTimeSelectTag);

    choosingTimeSelectTag.innerHTML = "";
    const slotListInChosenDate = slotResponsesMap.get(chosenDate);
    const defaultOptionTimeTag = document.createElement("option");
    defaultOptionTag.value = "";
    choosingTimeSelectTag.appendChild(defaultOptionTag);

    for (const slot of slotListInChosenDate) {
      const optionTimeTag = document.createElement("option");
      optionTimeTag.setAttribute("time", slot.startTimeWithinDay);
      optionTimeTag.setAttribute("slot-id", slot.id);
      optionTimeTag.value = slot.id;

      optionTimeTag.innerText = slot.startTimeWithinDay + " - " + slot.id + " " + " - " + slot.theaterRoom;

      choosingTimeSelectTag.appendChild(optionTimeTag);
    }

    choosingTimeSelectTag.addEventListener("change", async (e) => {
      e.preventDefault();
      console.log(choosingTimeSelectTag.value);

      if (choosingTimeSelectTag.value != "") {
        console.log(choosingTimeSelectTag.value);
        renderChoosingSeatView(choosingTimeSelectTag.value);
      }
    });
  });

  console.log(selectDayTag);
});

// ************ Handling choosing Seat View

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

let getMapRowSeat = async (slotId) => {
  return getApi(`http://localhost:8080/api/slots/${slotId}`)
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

      return seatMap;
    });
};

const renderChoosingSeatView = async (movieId) => {
  if (movieId == "") {
    let seatContainerInside = document.querySelector(".seat-container-inside");
    seatContainerInside.innerHTML = "";
    return;
  }

  getMapRowSeat(movieId).then((mapRowSeat) => {
    let seatContainerInside = document.querySelector(".seat-container-inside");
    seatContainerInside.innerHTML = "";
    console.log(seatContainerInside);

    let rows = mapRowSeat.keys();
    for (const row of rows) {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      rowDiv.setAttribute("row", row);
      // row ==> render a "row"

      let seatsInRow = mapRowSeat.get(row);
      for (const seat of seatsInRow) {
        let seatDiv = document.createElement("div");
        seatDiv.classList.add("seat");
        if (seat.status == "BOOKED") seatDiv.classList.add("occupied");

        seatDiv.innerText = seat.seatName;
        seatDiv.setAttribute("seat-name", seat.seatName);
        seatDiv.setAttribute("seat-class-name", seat.seatClass.seatClassName);
        seatDiv.setAttribute("price", seat.seatClass.price);
        seatDiv.setAttribute("seat-id", seat.seatId);

        if (seat.seatClass.seatClassName == "NOR") seatDiv.classList.add("nor");
        if (seat.seatClass.seatClassName == "VIP") seatDiv.classList.add("vip");

        if (!seatDiv.classList.contains("occupied")) {
          seatDiv.addEventListener("click", (e) => {
            let totalAmountElement = document.getElementById("totalAmount");
            let total = parseInt(totalAmountElement.innerText.replace(/,/g, ""));

            seatDiv.classList.toggle("selected");

            if (!seatDiv.hasAttribute("selected")) {
              total += parseInt(seatDiv.getAttribute("price"));
              seatDiv.setAttribute("selected", "");
            } else {
              total -= parseInt(seatDiv.getAttribute("price"));
              seatDiv.removeAttribute("selected");
            }

            totalAmountElement.innerText = total.toLocaleString("en-US");
          });
        }

        rowDiv.appendChild(seatDiv);
      }
      seatContainerInside.appendChild(rowDiv);
    }
  });
};

// ******************** Sending createOrder Form
const openPaymentFormBtn = document.querySelector("#open-payment-form");

const createOrderBtn = document.querySelector("#create-order-btn");
const closePaymentFormBtn = document.querySelector("#close-payment-form");

const paymentForm = document.querySelector(".payment-form");
const overlayOfPaymentForm = document.querySelector("#overlay");

const fullNameInput = document.querySelector("#full-name-input");
const emailInput = document.querySelector("#email-input");
const addressInput = document.querySelector("#address-input");
const dobInput = document.querySelector("#dob-input");

console.log(createOrderBtn);
console.log(closePaymentFormBtn);
console.log(paymentForm);
console.log(dobInput);

closePaymentFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  paymentForm.classList.add("hidden");
  overlayOfPaymentForm.classList.add("hidden");
});

openPaymentFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const choosingTimeSelectTag = document.querySelector("#choosing-time");
  console.log(choosingTimeSelectTag.value);

  let seatIdList = [];
  const chosenSeat = document.querySelectorAll(".seat-container-inside .selected");
  for (const seat of chosenSeat) {
    seatIdList.push(seat.getAttribute("seat-id"));
  }
  console.log(seatIdList);

  if (choosingTimeSelectTag.value == "") alert("Please choose Day and Time to create a Order!");
  else if (seatIdList.length == 0) alert("Please choose a seat before create a order!");
  else {
    paymentForm.classList.remove("hidden");
    overlayOfPaymentForm.classList.remove("hidden");
    createOrderBtn.setAttribute("seat-id-list", seatIdList);
    createOrderBtn.setAttribute("slot-id", choosingTimeSelectTag.selectedOptions[0].getAttribute("slot-id"));
  }
});

class OrderRequest {
  constructor(customerName, customerEmail, customerAddress, customerAge,  slotId, seatIdList) {
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerAddress = customerAddress;
    this.customerAge = customerAge;
    this.slotId = slotId;
    this.seatIdList = seatIdList;
  }

  toString() {
    return `OrderRequest { 
      customerName: ${this.customerName}, 
      customerEmail: ${this.customerEmail}, 
      customerAddress: ${this.customerAddress}, 
      customerAge: ${this.customerAge},
      slotId: ${this.slotId}, 
      seatIdList: [${this.seatIdList.join(", ")}]
    }`;
  }
}

createOrderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const seatIdList = createOrderBtn.getAttribute("seat-id-list").split(",");
  console.log(seatIdList);

  // Calculate age of customer
  const birthDate = new Date(dobInput.value);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  // End calculate "age"

  const orderRequest = new OrderRequest(fullNameInput.value, emailInput.value, addressInput.value, age, createOrderBtn.getAttribute('slot-id'), seatIdList);

  console.log(orderRequest);

  const endpoint = "http://localhost:8080/api/orders/";

// Fetch options for the POST request
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderRequest),
};

// Make the POST request
fetch(endpoint, requestOptions)
    .then(response => {
      if (response.ok) {
        // Parse the JSON response
        return response.json();
      } else {
        // If it's a bad request, log the error message
        return response.json().then(error => {
          console.log('Bad Request:', error.data);
          // You can handle the error further as needed
          throw new Error('Bad Request');
        });
      }
    })
    .then(data => {
      // If it's a success, log the specific field you're interested in
      alert("Create Order successfully");
      console.log('Total Value:', data.totalValue);
      // You can handle the success further as needed
    })
    .catch(error => {
        alert('Error:', error);
        console.error('Error:', error);
    });
});
