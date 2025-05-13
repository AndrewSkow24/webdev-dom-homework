const commentsListElement = document.getElementById("comment-list");
const addCommentButtonElement = document.getElementById("add-comment-button");
const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");

let commentsArray = [];

const getAllComments = () => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/andrew-skow/comments",
    {
      method: "GET",
    }
  );
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      commentsArray = responseData.comments;
      console.log(commentsArray);
      renderComments();
    });
  });
};

getAllComments();

const renderComments = () => {
  const commentsHtml = commentsArray
    .map((comment) => {
      const commentDate = new Date(comment.date);
      const formattedString =
        commentDate.toLocaleDateString("ru-Ru") +
        " " +
        commentDate.toLocaleTimeString("ru-RU");
      console.log(formattedString);
      return `
     <li class="comment data-id=${comment.id}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${formattedString}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  commentsListElement.innerHTML = commentsHtml;
};

addCommentButtonElement.addEventListener("click", () => {
  fetch("https://wedev-api.sky.pro/api/v1/andrew-skow/comments", {
    method: "POST",
    body: JSON.stringify({
      text: inputCommentElement.value,
      name: inputNameElement.value,
    }),
  }).then((response) => {
    response.json().then((responseData) => {
      console.log(responseData);
      getAllComments();
    });
  });

  // очистка формы
  inputNameElement.value = "";
  inputCommentElement.value = "";
});
