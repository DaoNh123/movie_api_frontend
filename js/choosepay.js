// NOTIFICATION TO PAYMENT FORM
  function showNotification() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("notification").classList.remove("hidden");
  }
  
  function hideNotification() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("notification").classList.add("hidden");
  }


  // document.addEventListener('DOMContentLoaded', function () {
  //   var seats = document.querySelectorAll('.seat');
  
  //   // Gọi API để lấy dữ liệu trạng thái chỗ ngồi từ máy chủ
  //   fetch('http://localhost:8080/api/slots/12')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Cập nhật trạng thái chỗ ngồi dựa trên dữ liệu nhận được từ máy chủ
  //       data.forEach(slot => {
  //         var seatElement = document.querySelector('.row .' + slot.seat);
  //         if (seatElement) {
  //           seatElement.classList.add(slot.status);
  
  //           // Vô hiệu hóa chỗ đã có người ngồi
  //           if (slot.status === 'occupied') {
  //             seatElement.removeEventListener('click', seatClickHandler);
  //           }
  //         }
  //       });
  //     })
  //     .catch(error => console.error('Lỗi khi lấy dữ liệu chỗ ngồi:', error));
  
  //   seats.forEach(function (seat) {
  //     seat.addEventListener('click', seatClickHandler);
  //   });
  
  //   function seatClickHandler() {
  //     // Kiểm tra xem chỗ còn trống hay không trước khi chuyển đổi lớp đã chọn
  //     if (!this.classList.contains('occupied')) {
  //       this.classList.toggle('selected');
  //       updateTotal();
  //     }
  //   }
  
  //   function updateTotal() {
  //     var selectedSeats = document.querySelectorAll('.selected');
  //     var vipSeatPrice = 15;
  //     var normalSeatPrice = 12;
  //     var selectedSeatPrice =
  //       selectedSeats.length *
  //       (document.getElementById('chair').value === '15' ? vipSeatPrice : normalSeatPrice);
  //     document.getElementById('totalAmount').innerText = '$' + selectedSeatPrice;
  //   }
  // });
  
  // // Modal box
  // const section = document.querySelector('section'),
  //   overlay = document.querySelector('.overlay'),
  //   showBtn = document.querySelector('.show-modal'),
  //   closeBtn = document.querySelector('.close-btn');
  
  // showBtn.addEventListener('click', () => section.classList.add('active'));
  // closeBtn.addEventListener('click', () => section.classList.remove('active'));
  


  // document.addEventListener('DOMContentLoaded', function () {
  //   // Hàm để lấy dữ liệu API
  //   let getApiData = async (apiLink) => {
  //     const response = await fetch(apiLink);
  //     const data = await response.json();
  //     return data;
  //   };
  
  //   // Hàm để tạo SeatClass
  //   class SeatClass {
  //     constructor(seatClassName, price) {
  //       this.seatClassName = seatClassName;
  //       this.price = price;
  //     }
  //   }
  
  //   // Hàm để tạo Seat
  //   class Seat {
  //     constructor(seatId, seatName, status, seatClass) {
  //       this.seatId = seatId;
  //       this.seatName = seatName;
  //       this.row = seatName[0];
  //       this.column = seatName.slice(1);
  //       this.status = status;
  //       this.seatClass = new SeatClass(seatClass.seatClassName, seatClass.price);
  //     }
  //     toString() {
  //       return `Seat ID: ${this.seatId}
  //         Seat Name: ${this.seatName}
  //         Status: ${this.status}
  //         Row: ${this.row}
  //         Column: ${this.column}
  //         Seat Class Name: [
  //           seatClassName: ${this.seatClass.seatClassName}
  //           price: ${this.seatClass.price}
  //         ]`;
  //     }
  //   }
  
  //   // Hàm để lấy Map của các dãy ghế
  //   let getMapRowSeat = async () => {
  //     return getApiData("http://localhost:8080/api/slots/11")
  //       .then((data) => {
  //         return data.map((seat) => new Seat(seat.seatId, seat.seatName, seat.status, seat.seatClass));
  //       })
  //       .then((listSeat) => {
  //         const seatMap = new Map();
  
  //         listSeat.forEach((seat) => {
  //           console.log(seat);
  //           const key = seat.row;
  //           if (!seatMap.has(key)) {
  //             seatMap.set(key, []);
  //           }
  //           seatMap.get(key).push(seat);
  //         });
  
  //         console.log(seatMap);
  //         return seatMap;
  //       });
  //   };

  //   // Fetch dữ liệu ghế và cập nhật giao diện
  //   getMapRowSeat()
  //   .then(mapRowSeat => {
  //     let rows = mapRowSeat.keys();
  //     for (const row of rows) {
  //       // Tạo phần tử div để chứa ghế trong mỗi dãy
  //       let rowContainer = document.createElement('div');
  //       rowContainer.classList.add('row-container');

  //       // Hiển thị số dãy
  //       let rowLabel = document.createElement('div');
  //       rowLabel.classList.add('row-label');
  //       rowLabel.textContent = `Row ${row}`;
  //       rowContainer.appendChild(rowLabel);

  //       // Hiển thị các ghế trong dãy
  //       let seatsInRow = mapRowSeat.get(row);
  //       seatsInRow.forEach(seat => {
  //         let seatElement = document.createElement('div');
  //         seatElement.classList.add('seat');
  //         seatElement.textContent = seat.seatName;

  //         // Thêm màu sắc tương ứng dựa trên trạng thái ghế
  //         if (seat.status === 'occupied') {
  //           seatElement.classList.add('occupied');
  //         } else {
  //           seatElement.classList.add('available');
  //           seatElement.addEventListener('click', seatClickHandler);
  //         }

  //         rowContainer.appendChild(seatElement);
  //       });

  //       // Thêm dãy ghế vào container chính
  //       seatsContainer.appendChild(rowContainer);
  //     }
  //   })
  //   .catch(error => console.error('Error fetching seat data:', error));
  // });
  
  
