/**    NOTIFICATION  **/
// cua so pop up
const popup = document.querySelector('.popup');
const close = document.querySelector('.close-popup')

window.onload = function(){
  setTimeout(function(){
    popup.style.display = "block"

     // Add some time delay to show popup
  },1500)
}
close.addEventListener('click',()=>{
   popup.style.display = "none"
})

// SCROLL HEADER
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll',()=>{
  header.classList.toggle('shadow',window.scrollY > 0);
});

menu.onclick = () =>{
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

// SLIDE 
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }); 

  // SLIDE WRAPPER
  var swiper = new Swiper(".coming-container",{
    spaceBetween: 20,
    loop:true,
    autoplay:{
      delay:1500,
      disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
      0:{
        slidesPerView:2,
      },
      568:{
        slidesPerView:3,
      },
      768:{
        slidesPerView:4,
      },
      968:{
        slidesPerView:5,
      },
    },
  });

  
// Render API ra ngoài trình duyệt
const fetchApi = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

document.addEventListener("DOMContentLoaded", () => {
  const moviesSection = document.getElementById("movie");

  fetchApi("http://localhost:8080/api/movies").then((data) => {
    let movies = data.content;

    let html = `
      <h2 class="heading">
        Opening This Week
      </h2>
      <div class="grid-container">
    `;

    movies.forEach((movie) => {
      html += `
        <div class="box" id="movieDetails">
          <div class="box-img">
            <a href="details.html?id=${movie.id}"><img src="${movie.posterUrl}" alt=""></a>
            <div class="overlay">
              <div class="button-container">
                <a href="choosepay.html" class="book-button">Book</a>
                <a href="details.html?id=${movie.id}" class="detail-button">Detail</a>
              </div>
            </div>
            <div class="movie-label">${movie.movieLabel}</div>
          </div>
          <a href="details.html?id=${movie.id}"><h3 id="movieName">${movie.movieName}</h3></a>
          <span id="duration">${movie.duration} min </span>
        </div>
      `;
    });

    html += `
      </div>
    `;

    moviesSection.innerHTML = html;
  });
});
