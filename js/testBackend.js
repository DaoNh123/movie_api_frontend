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
