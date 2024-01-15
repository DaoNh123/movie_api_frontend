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

class SlotResponse {
  constructor(id, startTime, endTime, theaterRoom) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.theaterRoom = theaterRoom;
  }

  toString() {
      return `SlotResponse(id=${this.id}, startTime=${this.startTime}, endTime=${this.endTime}, theaterRoom=${this.theaterRoom})`;
  }
}

class OverallResponse {
  constructor(resultSize, slotResponses) {
      this.resultSize = resultSize;
      this.slotResponses = slotResponses.map(slot => new SlotResponse(slot.id, slot.startTime, slot.endTime, slot.theaterRoom));
  }

  toString() {
      return `OverallResponse(resultSize=${this.resultSize}, slotResponses=[${this.slotResponses.map(slot => slot.toString()).join(', ')}])`;
  }
}

// Example usage
const jsonData = {
  "resultSize": 13,
  "slotResponses": [
      {
          "id": 1,
          "startTime": "2024-01-06@09:27:56.858+0700",
          "endTime": null,
          "theaterRoom": "A005"
      },
      {
          "id": 2,
          "startTime": "2024-01-02@09:27:56.858+0700",
          "endTime": null,
          "theaterRoom": "A005"
      },
      {
          "id": 3,
          "startTime": "2024-01-03@09:27:56.858+0700",
          "endTime": null,
          "theaterRoom": "A001"
      }
  ]
};

const responseObject = new OverallResponse(jsonData.resultSize, jsonData.slotResponses);

console.log(responseObject.toString());


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
  return getApi("http://localhost:8080/api/slots/14")
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
    // row ==> render a "row"
    
    let seatsInRow = mapRowSeat.get(row);
    console.log(seatsInRow);
    // seatsInRow ==> render seats in a row. Each seat render status ==> set color depend on this seat is "available" or "booked", price, ...
  }
});

// const seatList = getApi("http://localhost:8080/api/slots/14")
// .then((data) => data.json)
// .then(data => data.map((seat) => new Seat(seat.seatId, seat.seatName, seat.status, seat.seatClass)))
// .then(data => data.forEach(seat => console.log(seat)));

// console.log(seatList);
