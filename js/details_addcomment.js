class CreateCommentRequest {
  constructor(commentUsername, starRate, commentContent, movieId) {
    this.commentUsername = commentUsername;
    this.starRate = starRate;
    this.commentContent = commentContent;
    this.movieId = movieId;
  }
}

const starIcons = document.querySelectorAll(".starRate i");
const commentSubmitBtn = document.querySelector("button#comment-submit");
const commentUsernameInput = document.querySelector("input#commentUsername");
const commentContentInput = document.querySelector("input#comment-content");
const movieId2 = getMovieIdFromUrl();

starIcons.forEach((star, index) => {
  star.addEventListener("click", () => {
    // Thay đổi màu sắc và trạng thái active của các ngôi sao
    starIcons.forEach((s, i) => {
      if (i <= index) {
        s.classList.add("bxs-star", "active");
        s.classList.remove("bx-star");
      } else {
        s.classList.remove("bxs-star", "active");
        s.classList.add("bx-star");
      }
    });
  });
});

commentSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const commentUsername = commentUsernameInput.value;
  const commentContent = commentContentInput.value;

  console.log(commentSubmitBtn);

    postComment()
      .then((response) => {
        if (response.status === 401) {
          throw new Error(`Your login session have expired! Please login your account!`);
        } 
        return response.json();
      })
      .then((comment) => {
        console.log(comment);

        const commentList = document.querySelector(".commentList");

        let stars = "";
        for (let i = 0; i < comment.starRate; i++) {
          stars += "<i class='bx bxs-star'></i>";
        }

        commentList.innerHTML += `
        <div class="comment">
          <div class="flex">
              <div class="user">
                <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
                <div class="user-meta">
                  <div class="commentUsername"><p>${comment.commentUsername}</p></div>
                  <div class="starRate">${stars}</div>
                </div>
              </div>
              <div class="reply">
                <div class="like icon"><i class="bx bx-like"></i></div>
                <div class="dislike icon"><i class="bx bx-dislike"></i></div>
                <div class="">Reply</div>
              </div>
          </div>
          <div class="commentContent">
            <p>${comment.commentContent}</p>
          </div>
        </div>  
      `;

        // Reset ngôi sao sau khi gửi comment
        starIcons.forEach((s) => {
          s.classList.remove("bxs-star", "active");
          s.classList.add("bx-star");
        });

        // Xóa nội dung input
        commentUsernameInput.value = "";
        commentContentInput.value = "";
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }
);

const postComment = () => {
  let jwt = getCookie("jwt");
  let jwtExist = true;
  if (jwt == undefined) jwtExist = false;
  let userDto;
  if(jwtExist){
    userDto = new UserDto(getCookie("userDto"));
  }
  console.log(userDto);

  const commentUsername = jwtExist ? userDto.fullName : commentUsernameInput.value;
  const commentContent = commentContentInput.value;

  if (commentContent.trim() === "") {
    alert("Comment content can not be empty!");
    return;
  }

  if (!jwtExist && commentUsername.trim() === "") {
    alert("Username can not be empty!");
    return;
  }

  const starRate = document.querySelectorAll(".starRate i.active").length;
  if(starRate === 0) {
    alert("You must choose star rate for this movie before comment!");
    return;
  }

  const createCommentRequest = new CreateCommentRequest(commentUsername, starRate, commentContent, movieId2);

  console.log(createCommentRequest);

  let postOption;
  let postUrl;
  if (jwtExist) {
    postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
      body: JSON.stringify(createCommentRequest),
    };
    postUrl = `${backendUrl}/api/users/comments`;
  } else {
    postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCommentRequest),
    };
    postUrl = `${backendUrl}/api/comments`;
  }

  return fetch(postUrl, postOption);
};

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
}
