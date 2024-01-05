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
// fetch('http://localhost:8080/api/movies')
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
//     const trailerIframe = document.querySelector('.iframe iframe');
//     const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');

//     const updateMovieDetails = (movie) => {
//       movieNameElements.forEach(movieNameElement => {
//         movieNameElement.textContent = movie.movieName;
//       });
//       description.textContent = movie.description;
//       director.textContent = `Director: ${movie.director || 'Unknown'}`;
//       categoryNameList.textContent = `Category: ${movie.categoryNameList.join(', ')}`;
//       duration.textContent = `Duration: ${movie.duration} min`;
//       language.textContent = `Language: ${movie.language}`;
//       openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
//       closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
//       posterUrl.src = movie.posterUrl;
//       detailsIndexMovieName.textContent = movie.movieName;
//       trailerIframe.src = movie.iframe;
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


// Fetch movie details from the API
fetch('http://localhost:8080/api/movies/now-showing?page=0&size=28')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    }
    return response.json();
  })
  .then(data => {
    const movies = data;

    // Render movie details
    const movieContainer = document.getElementById('movie-container');

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const posterUrlElement = document.createElement('div');
      posterUrlElement.classList.add('posterUrl');
      const posterImage = document.createElement('img');
      posterImage.src = movie.posterUrl;
      posterImage.alt = '';
      posterUrlElement.appendChild(posterImage);
      movieElement.appendChild(posterUrlElement);

      const detailsInforElement = document.createElement('div');
      detailsInforElement.classList.add('details-infor');

      const movieNameElement = document.createElement('h2');
      movieNameElement.classList.add('movieName');
      movieNameElement.textContent = movie.movieName;
      detailsInforElement.appendChild(movieNameElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('description');
      descriptionElement.textContent = movie.description;
      detailsInforElement.appendChild(descriptionElement);

      const detailsMenuElement = document.createElement('ul');
      detailsMenuElement.classList.add('details-menu');

      const directorElement = document.createElement('li');
      directorElement.classList.add('director');
      directorElement.textContent = `Director: ${movie.director || 'Unknown'}`;
      detailsMenuElement.appendChild(directorElement);

      const categoryNameListElement = document.createElement('li');
      categoryNameListElement.classList.add('categoryNameList');
      categoryNameListElement.textContent = `Category: ${movie.categoryNameList.join(', ')}`;
      detailsMenuElement.appendChild(categoryNameListElement);

      const durationElement = document.createElement('li');
      durationElement.classList.add('duration');
      durationElement.textContent = `Duration: ${movie.duration} min`;
      detailsMenuElement.appendChild(durationElement);

      const languageElement = document.createElement('li');
      languageElement.classList.add('language');
      languageElement.textContent = `Language: ${movie.language}`;
      detailsMenuElement.appendChild(languageElement);

      const openingTimeElement = document.createElement('li');
      openingTimeElement.classList.add('openingTime');
      openingTimeElement.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
      detailsMenuElement.appendChild(openingTimeElement);

      const closingTimeElement = document.createElement('li');
      closingTimeElement.classList.add('closingTime');
      closingTimeElement.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
      detailsMenuElement.appendChild(closingTimeElement);

      detailsInforElement.appendChild(detailsMenuElement);

      const bookNowButton = document.createElement('a');
      bookNowButton.classList.add('btn');
      bookNowButton.href = 'choosepay.html';
      bookNowButton.textContent = 'Book Now';
      detailsInforElement.appendChild(bookNowButton);

      movieElement.appendChild(detailsInforElement);

      movieContainer.appendChild(movieElement);

      // Fetch comments for each movie
      fetch(`http://localhost:8080/api/movies/${movie.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch comment data');
          }
          return response.json();
        })
        .then(data => {
          const commentList = data.commentList;

          // Render comments
          const commentListContainer = document.createElement('div');
          commentListContainer.classList.add('comment-list');

          commentList.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const userElement = document.createElement('div');
            userElement.classList.add('flex');

            const userImageElement = document.createElement('div');
            userImageElement.classList.add('user-image');
            const userImage = document.createElement('img');
            userImage.src = 'image/icon1.jpg';
            userImage.alt = '';
            userImageElement.appendChild(userImage);
            userElement.appendChild(userImageElement);

            const userMetaElement = document.createElement('div');
            userMetaElement.classList.add('user-meta');

            const usernameElement = document.createElement('div');
            usernameElement.classList.add('commentUsername');
            const username = document.createElement('p');
            username.textContent = '@' + comment.commentUsername;
            usernameElement.appendChild(username);
            userMetaElement.appendChild(usernameElement);

            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = '10 days ago';
            userMetaElement.appendChild(dayElement);

            userElement.appendChild(userMetaElement);

            commentElement.appendChild(userElement);

            const commentContentElement = document.createElement('div');
            commentContentElement.classList.add('commentContent');
            commentContentElement.textContent = comment.commentContent;
            commentElement.appendChild(commentContentElement);

            commentListContainer.appendChild(commentElement);
            });

            movieElement.appendChild(commentListContainer);
            })
            .catch(error => {
            console.error(error);
            });
        });
    });
