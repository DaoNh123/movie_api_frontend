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

// let urlParams = new URLSearchParams(window.location.search);
// let movieId  = decodeURIComponent(urlParams.get('movie.id'));

// // Fetch API data
fetch('http://localhost:8080/api/movies')
  .then(response => response.json())
  .then(data => {
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
    const trailerIframe = document.querySelector('.iframe iframe');
    const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');

    const updateMovieDetails = (movie) => {
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
      trailerIframe.src = movie.iframe;
    };

    movieLinks.forEach(movieLink => {
      const movieId = movieLink.getAttribute('href').split('=')[1];
      const movie = data.content.find(movie => movie.id === parseInt(movieId));
      if (movie) {
        movieLink.addEventListener('click', (e) => {
          e.preventDefault();
          updateMovieDetails(movie);
        });
      }
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const initialMovieId = urlParams.get('id');
    const initialMovie = data.content.find(movie => movie.id === parseInt(initialMovieId));
    if (initialMovie) {
      updateMovieDetails(initialMovie);
    }

  })
  .catch(error => { console.log(error); });

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

// POST COMMENT
const commentForm = document.querySelector('#comment-form');
const commentInput = commentForm.querySelector('input[type="text"]');
const commentButton = commentForm.querySelector('button');

const handleCommentSubmission = () => {
  const commentContent = commentInput.value;

  const newCommentList = document.createElement('div');
  newCommentList.classList.add('comment-list');

  const newCommentBox = document.createElement('div');
  newCommentBox.classList.add('comment-box');

  newCommentBox.innerHTML = `
    <div class="flex">
      <div class="user">
        <div class="user-image"><img src="image/icon2.jpg" alt=""></div>
        <div class="user-meta">
          <div class="name"><p>@YourUsername</p></div>
          <div class="day">Just now</div>
        </div>
      </div>
      <div class="reply">
        <div class="like icon"><i class='bx bx-like'></i></div>
        <div class="dislike icon"><i class='bx bx-dislike'></i></div>
        <div class="">Reply</div>
      </div>
    </div>
    <div class="comment">
      <p>${commentContent}</p>
    </div>
  `;

  const commentLists = document.querySelectorAll('.comment-list');
  const lastCommentList = commentLists[commentLists.length - 1];

  if (lastCommentList) {
    lastCommentList.after(newCommentList);
    lastCommentList.after(newCommentBox);
  } else {
    commentForm.after(newCommentList);
    commentForm.after(newCommentBox);
  }

  commentInput.value = '';
};

commentButton.addEventListener('click', handleCommentSubmission);

