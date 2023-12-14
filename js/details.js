


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