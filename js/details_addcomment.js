// class CreateCommentRequest {
//   constructor(commentUsername, starRate, commentContent, movieId) {
//     this.commentUsername = commentUsername;
//     this.starRate = starRate;
//     this.commentContent = commentContent;
//     this.movieId = movieId;
//   }
// }

// let urlParams2 = new URLSearchParams(window.location.search);
// let movieId2 = decodeURIComponent(urlParams.get("id"));

// const commentSubmitBtn = document.querySelector("button#comment-submit");
// const commentUsernameInput = document.querySelector("input#commentUsername");
// const commentContentInput = document.querySelector("input#comment-content");
// const starRateDiv = document.querySelector(".starRate");
// let starRate = 0;

// starRateDiv.addEventListener("click", (e) => {
//   if (e.target.tagName === "I") {
//     const starIcons = starRateDiv.querySelectorAll("i");

//     for (let i = 0; i < starIcons.length; i++) {
//       if (i < e.target.dataset.star) {
//         starIcons[i].classList.add("active");
//       } else {
//         starIcons[i].classList.remove("active");
//       }
//     }

//     starRate = parseInt(e.target.dataset.star);
//   }
// });

// commentSubmitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const commentUsername = commentUsernameInput.value;
//   const commentContent = commentContentInput.value;

//   if (commentContent != "" && commentUsername != "" && starRate != 0) {
//     const createCommentRequest = new CreateCommentRequest(commentUsername, starRate, commentContent, movieId2);

//     fetch("http://localhost:8080/api/comments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(createCommentRequest),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((comment) => {
//         const commentList = document.querySelector(".comment");

//         commentList.innerHTML += `
//           <div class="comment">
//             <div class="flex">
//               <div class="user">
//                 <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
//                 <div class="user-meta">
//                   <div class="commentUsername"><p>${comment.commentUsername}</p></div>
//                   <div class="starRate">
//                     ${
//                       Array.from({ length: comment.starRate }, (_, i) => `
//                         <i class='bx bxs-star active'></i>
//                       `).join("")
//                     }
//                     ${
//                       Array.from({ length: 5 - comment.starRate }, (_, i) => `
//                         <i class='bx bxs-star'></i>
//                       `).join("")
//                     }
//                   </div>
//                 </div>
//               </div>
//               <div class="reply">
//                 <div class="like icon"><i class="bx bx-like"></i></div>
//                 <div class="dislike icon"><i class="bx bx-dislike"></i></div>
//                 <div class="">Reply</div>
//               </div>
//             </div>
//             <div class="commentContent">
//               <p>${comment.commentContent}</p>
//             </div>
//           </div>  
//         `;
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });

//     // Reset form fields and star rating
//     commentUsernameInput.value = "";
//     commentContentInput.value = "";
//     starRate = 0;
//     const starIcons = starRateDiv.querySelectorAll("i");
//     starIcons.forEach((icon, index) => {
//       if (index < starRate) {
//         icon.classList.add("active");
//       } else {
//         icon.classList.remove("active");
//       }
//     });
//   }
// });


// //test2
// class CreateCommentRequest {
//   constructor(commentUsername, starRate, commentContent, movieId) {
//     this.commentUsername = commentUsername;
//     this.starRate = starRate;
//     this.commentContent = commentContent;
//     this.movieId = movieId;
//   }
// }

// const starIcons = document.querySelectorAll(".starRate i");
// const commentSubmitBtn = document.querySelector("button#comment-submit");
// const commentUsernameInput = document.querySelector("input#commentUsername");
// const commentContentInput = document.querySelector("input#comment-content");
// const movieId2 = getMovieIdFromUrl(); // Assuming you have a function to extract movieId

// starIcons.forEach((star, index) => {
//   star.addEventListener("click", () => {
//     // Thay đổi màu sắc của các ngôi sao
//     starIcons.forEach((s, i) => {
//       if (i <= index) {
//         s.classList.add("bxs-star");
//         s.classList.remove("bx-star");
//       } else {
//         s.classList.remove("bxs-star");
//         s.classList.add("bx-star");
//       }
//     });
//   });
// });

// commentSubmitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const commentUsername = commentUsernameInput.value;
//   const commentContent = commentContentInput.value;

//   if (commentContent !== "" && commentUsername !== "") {
//     const starRate = document.querySelectorAll(".starRate i.bxs-star").length;

//     const createCommentRequest = new CreateCommentRequest(
//       commentUsername,
//       starRate,
//       commentContent,
//       movieId2
//     );

//     console.log(createCommentRequest);

//     fetch("http://localhost:8080/api/comments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(createCommentRequest),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((comment) => {
//         const commentList = document.querySelector(".comment");

//         commentList.innerHTML += `
//           <div class="comment">
//           <div class="flex">
//                 <div class="user">
//                   <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
//                   <div class="user-meta">
//                     <div class="commentUsername"><p>${comment.commentUsername}</p></div>
//                     <div class="starRate">${comment.starRate} stars</div>
//                   </div>
//                 </div>
//                 <div class="reply">
//                   <div class="like icon"><i class="bx bx-like"></i></div>
//                   <div class="dislike icon"><i class="bx bx-dislike"></i></div>
//                   <div class="">Reply</div>
//                 </div>
//               </div>
//               <div class="commentContent">
//                 <p>${comment.commentContent} </p>
//               </div>
//         `;
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
// });

// function getMovieIdFromUrl() {
//   const urlParams = new URLSearchParams(window.location.search);
//   return decodeURIComponent(urlParams.get("id"));
// }


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

  if (commentContent !== "" && commentUsername !== "") {
    const starRate = document.querySelectorAll(".starRate i.active").length;

    const createCommentRequest = new CreateCommentRequest(
      commentUsername,
      starRate,
      commentContent,
      movieId2
    );

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
        return response.json();
      })
      .then((comment) => {
        const commentList = document.querySelector(".comment");

        commentList.innerHTML += `
        <div class="comment">
                 <div class="flex">
                      <div class="user">
                           <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
                         <div class="user-meta">
                             <div class="commentUsername"><p>${comment.commentUsername}</p></div>
                             <div class="starRate">${comment.starRate} stars</div>
                           </div>
                         </div>
                       <div class="reply">
                           <div class="like icon"><i class="bx bx-like"></i></div>
                           <div class="dislike icon"><i class="bx bx-dislike"></i></div>
                           <div class="">Reply</div>
                         </div>
                       </div>
                       <div class="commentContent">
                         <p>${comment.commentContent} </p>
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
        console.error("Error:", error);
      });
  }
});

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
}
