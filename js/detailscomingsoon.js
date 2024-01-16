// // SCROLL HEADER
// let header = document.querySelector('header');
// let menu = document.querySelector('#menu-icon');
// let navbar = document.querySelector('.navbar');

// window.addEventListener('scroll',()=>{
//   header.classList.toggle('shadow',window.scrollY > 0);
// });

// menu.onclick = () =>{
//   menu.classList.toggle('bx-x');
//   navbar.classList.toggle('active');
// }

// window.onscroll = () =>{
//   menu.classList.remove('bx-x');
//   navbar.classList.remove('active');
// }

// let urlParams = new URLSearchParams(window.location.search);
// let movieId = decodeURIComponent(urlParams.get('movie.id'));

// fetch(`http://localhost:8080/api/movies/coming-soon?pages=0&size=18${movieId}`)
//   .then(response => response.json())
//   .then(data => {
//     const movieNameElements = document.querySelectorAll('.movieName');
//     const description = document.querySelector('.description');
//     const director = document.querySelector('.director');
//     const categoryNameList = document.querySelector('.categoryNameList');
//     const duration = document.querySelector('.duration');
//     const language = document.querySelector('.language');
//     const openingTime = document.querySelector('.openingTime');
//     const closingTime = document.querySelector('.closingTime');
//     const posterUrl = document.querySelector('.posterUrl img');
//     const detailsIndexMovieName = document.querySelector('#details-index .movieName');
//     const trailerIframe = document.querySelector(".iframe iframe");

//     // Uncomment the following line to define movieLinks
//     const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');

//     const updateMovieDetails = (movie) => {
//       movieNameElements.forEach(movieNameElement => {
//         movieNameElement.textContent = movie.movieName;
//       });
//       description.textContent = movie.description;
//       // director.textContent = `Director: ${movie.director || 'Unknown'}`;
//       categoryNameList.textContent = `Category: ${movie.categoryNameList.join(', ')}`;
//       duration.textContent = `Duration: ${movie.duration} min`;
//       language.textContent = `Language: ${movie.language}`;
//       openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
//       closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
//       posterUrl.src = movie.posterUrl;
//       detailsIndexMovieName.textContent = movie.movieName;
//       trailerIframe.src = movie.trailerUrl;
//     };

//     movieLinks.forEach(movieLink => {
//       const movieId = movieLink.getAttribute('href').split('=')[1];
//       const movie = data.content.find(movie => movie.id === parseInt(movieId));
//       if (movie) {
//         movieLink.addEventListener('click', (e) => {
//           e.preventDefault();
//           updateMovieDetails(movie);
//         });
//       }
//     });

//     const urlParams = new URLSearchParams(window.location.search);
//     const initialMovieId = urlParams.get('id');
//     const initialMovie = data.content.find(movie => movie.id === parseInt(initialMovieId));
//     if (initialMovie) {
//       updateMovieDetails(initialMovie);
//     }

//   })
//   .catch(error => { console.log(error); });


//   // NOTITIFICATION
//   function showNotification() {
//     document.getElementById("overlay").classList.remove("hidden");
//     document.getElementById("notification").classList.remove("hidden");
//   }

//   function hideNotification() {
//     document.getElementById("overlay").classList.add("hidden");
//     document.getElementById("notification").classList.add("hidden");
//   }




//************************************ */
// SCROLL HEADER
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const movieNameElements = document.querySelectorAll(".movieName");
const description = document.querySelector(".description");
const director = document.querySelector(".director");
const categoryNameList = document.querySelector(".categoryNameList");
const duration = document.querySelector(".duration");
const language = document.querySelector(".language");
const openingTime = document.querySelector(".openingTime");
const closingTime = document.querySelector(".closingTime");
const posterUrl = document.querySelector(".posterUrl img");
const detailsIndexMovieName = document.querySelector("#details-index .movieName");
const trailerIframe = document.querySelector(".iframe iframe");

const choosePayBtn = document.querySelector('#choose-pay-btn');


let urlParams = new URLSearchParams(window.location.search);
let movieId = decodeURIComponent(urlParams.get("id"));

// // Fetch API data
fetch(`http://localhost:8080/api/movies/${movieId}`)
  .then((response) => response.json())
  .then((movie) => {
    console.log(movie);
    const movieNameElements = document.querySelectorAll(".movieName");
    const description = document.querySelector(".description");
    const director = document.querySelector(".director");
    const categoryNameList = document.querySelector(".categoryNameList");
    const duration = document.querySelector(".duration");
    const language = document.querySelector(".language");
    const openingTime = document.querySelector(".openingTime");
    const closingTime = document.querySelector(".closingTime");
    const posterUrl = document.querySelector(".posterUrl img");
    const detailsIndexMovieName = document.querySelector("#details-index .movieName");
    const trailerIframe = document.querySelector(".iframe iframe");
    // const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');
    const commentList = document.querySelector(".comment-list");
    console.log(commentList);

    movieNameElements.forEach((e) => (e.textContent = movie.movieName));
    description.textContent = movie.description;
    categoryNameList.textContent = `Category: ${movie.categoryNameList.join(", ")}`;
    duration.textContent = `Duration: ${movie.duration} min`;
    language.textContent = `Language: ${movie.language}`;
    openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
    closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
    posterUrl.src = movie.posterUrl;
    detailsIndexMovieName.textContent = movie.movieName;
    trailerIframe.src = movie.trailerUrl;

    // commentList.innerHTML = "";

    // movie.commentList.forEach((comment) => {
    //   commentList.innerHTML += `
    //   <div class="flex">
    //           <div class="user">
    //             <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
    //             <div class="user-meta">
    //               <div class="commentUsername"><p>${comment.commentUsername}</p></div>
    //               <div class="day">4 day ago</div>
    //             </div>
    //           </div>
    //           <div class="reply">
    //             <div class="like icon"><i class="bx bx-like"></i></div>
    //             <div class="dislike icon"><i class="bx bx-dislike"></i></div>
    //             <div class="">Reply</div>
    //           </div>
    //         </div>
    //         <div class="commentContent">
    //           <p>${comment.commentContent} with rating ${comment.starRate} stars</p>
    //         </div>
    //   `;

   
    });
  

  // NOTITIFICATION
  function showNotification() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("notification").classList.remove("hidden");
  }

  function hideNotification() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("notification").classList.add("hidden");
  }
