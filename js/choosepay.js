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