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

// COMMENT
const replyDiv = document.querySelectorAll('.reply');

replyDiv.forEach((replyDivs) => {
  const likeBtn = replyDivs.querySelector('.like');
  const dislikeBtn = replyDivs.querySelector('.dislike');
  let likesCount = 0;
  let dislikesCount = 0;

  likeBtn.addEventListener('click', () => {
    likesCount++;
    updateCounts();
  });

  dislikeBtn.addEventListener('click', () => {
    dislikesCount++;
    updateCounts();
  });

  function updateCounts() {
    const likeCountElement = likeBtn.querySelector('i');
    const dislikeCountElement = dislikeBtn.querySelector('i');

    likeCountElement.textContent = likesCount;
    dislikeCountElement.textContent = dislikesCount;
  }
});

 

// Render API ra ngoài trình duyệt
// const fetchSingleApi = async (api) => {
//   const response = await fetch(api);
//   const data = await response.json();
//   return data;
// };

document.addEventListener("DOMContentLoaded", () => {
  const detailsSection = document.querySelector("movie");

  fetchApi.get("http://localhost:8080/api/movies").then((data) => {
    let html = `
    <section>
      <p id="details-index">HOME > ${movie.movieName}</p>
        <div class="details-img">
          <img src="${movie.posterUrl}" alt="">
        </div>
        <div class="details-infor">
          <h2>${movie.movieName}</h2>
          <p id="desc">${movie.description}</p>    
          <ul class="details-menu">
            <li><strong>Director:</strong> &nbsp; ${movie.director}</li>
            <li><strong>Category:</strong> &nbsp; ${movie.category}</li>
            <li><strong>Time:</strong> &nbsp; ${movie.duration }</li>
            <li><strong>Language:</strong> &nbsp; ${movie.language }</li>
            <li><strong>Premiere Date :</strong> &nbsp; ${movie.openingDay}</li>
          </ul>
          <a href="choosepay.html" class="btn">Book Now</a>
        </div>
      </section>
      `;

    detailsSection.innerHTML = html;
  });
});

