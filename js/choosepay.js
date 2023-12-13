
document.addEventListener('DOMContentLoaded', function () {
  var seats = document.querySelectorAll('.seat');

  seats.forEach(function (seat) {
      seat.addEventListener('click', function () {
          // Toggle seat selection
          seat.classList.toggle('selected');
          updateTotal();
      });
  });

  function updateTotal() {
      var selectedSeats = document.querySelectorAll('.selected');
      var vipSeatPrice = 15;
      var normalSeatPrice = 12;

      // Calculate total based on seat type (VIP or Normal)
      var selectedSeatPrice = selectedSeats.length * (document.getElementById('chair').value === '15' ? vipSeatPrice : normalSeatPrice);

      // Update total amount display (you can adjust this based on your HTML structure)
      document.getElementById('totalAmount').innerText = '$' + selectedSeatPrice;
  }
});

// Modal box
const section = document.querySelector("section"),
overlay = document.querySelector(".overlay"),
showBtn = document.querySelector(".show-modal"),
closeBtn = document.querySelector(".close-btn");

showBtn.addEventListener("click", () => section.classList.add("active"));
closeBtn.addEventListener("click",() =>
section.classList.remove("active"));