class CreateCommentRequest {
  constructor(commentUsername, starRate, commentContent, movieId) {
    this.commentUsername = commentUsername;
    this.starRate = starRate;
    this.commentContent = commentContent;
    this.movieId = movieId;
  }
}

let urlParams2 = new URLSearchParams(window.location.search);
let movieId2 = decodeURIComponent(urlParams.get("id"));

const commentSubmitBtn = document.querySelector("button#comment-submit");
const commentUsernameInput = document.querySelector("input#commentUsername");
console.log(commentUsernameInput);
const commentContentInput = document.querySelector("input#comment-content");
console.log(commentContentInput);
console.log(1);

commentSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault;
  const commentUsername = commentUsernameInput.value;
  const commentContent = commentContentInput.value;

  if (commentContent != "" && commentUsername != "") {
    const startRate = Math.floor(Math.random() * 5) + 1;

    const createCommentRequest = new CreateCommentRequest(commentUsername, startRate, commentContent, movieId2);

    console.log(createCommentRequest);

    fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCommentRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        // Handle the response data
        console.log("Response data:", data);
        return data;
      })
      .then((comment) => {
        const commentList = document.querySelector(".comment-list");
        console.log(comment);

        commentList.innerHTML += `
        <div class="flex">
                <div class="user">
                  <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
                  <div class="user-meta">
                    <div class="commentUsername"><p>${comment.commentUsername}</p></div>
                    <div class="day">4 day ago</div>
                  </div>
                </div>
                <div class="reply">
                  <div class="like icon"><i class="bx bx-like"></i></div>
                  <div class="dislike icon"><i class="bx bx-dislike"></i></div>
                  <div class="">Reply</div>
                </div>
              </div>
              <div class="commentContent">
                <p>${comment.commentContent} with rating ${comment.starRate} stars</p>
              </div>
        `;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
});
