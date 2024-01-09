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



// ...

// Render Infor Movie + Comment and Post Comment
const updateMovieDetails = (movie) => {
  const movieNameElements = document.querySelectorAll('.movieName');
  const description = document.querySelector('.description');
  const director = document.querySelector('.director');
  const categoryNameList = document.querySelector('.categoryNameList');
  const duration = document.querySelector('.duration');
  const language = document.querySelector('.language');
  const openingTime = document.querySelector('.openingTime');
  const closingTime = document.querySelector('.closingTime');
  const posterUrl = document.querySelector('.posterUrl img');
  const detailsIndexMovieName = document.querySelector('#details-index .movieName');

  movieNameElements.forEach(movieNameElement => {
    movieNameElement.textContent = movie.movieName;
  });
  description.textContent = movie.description;
  director.textContent = `Director: ${movie.director || 'Unknown'}`;
  categoryNameList.textContent = `Category: ${movie.categoryNameList.join(', ')}`;
  duration.textContent = `Duration: ${movie.duration} min`;
  language.textContent = `Language: ${movie.language}`;
  openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
  closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
  posterUrl.src = movie.posterUrl;
  detailsIndexMovieName.textContent = movie.movieName;
};

// Fetch the list of movies
fetch('http://localhost:8080/api/movies/now-showing?page=0&size=28')
  .then(response => response.json())
  .then(data => {

    const urlParams = new URLSearchParams(window.location.search);
    const initialMovieId = urlParams.get('id');
    const initialMovie = data.content.find(movie => movie.id === parseInt(initialMovieId));

    if (initialMovie) {
      updateMovieDetails(initialMovie);

      fetch(`http://localhost:8080/api/movies/${initialMovieId}/comments`)
        .then(response => response.json())
        .then(data => {
          const comments = data.commentList ? Object.values(data.commentList) : [];
          comments.forEach(comment => {
            console.log(comment);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  })
  .catch(error => {
    console.log(error);
  });

const form = document.querySelector('#comment-input');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const commentInput = document.querySelector('#comment-input input');
  const comment = commentInput.value;

  // debugger;

  fetch(`http://localhost:8080/api/movies/${initialMovieId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: comment })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

    })
    .catch(error => {
      console.error(error);
    });

  commentInput.value = '';
});
