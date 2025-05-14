const commentsListElement = document.getElementById("comment-list");
const addCommentButtonElement = document.getElementById("add-comment-button");
const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");

let commentsArray = [];

const fetchAndRenderAllComments = () => {
  commentsListElement.textContent = "Подождите, комментарии загружаются ...";
  return fetch("https://wedev-api.sky.pro/api/v1/andrew-skow/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      commentsArray = responseData.comments;
      renderComments();
    });
};

fetchAndRenderAllComments();

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
  inputNameElement.style.display = "none";
  inputCommentElement.style.display = "none";
  addCommentButtonElement.style.display = "none";
  const loadingMessage = document.getElementById("loading-elemment");
  loadingMessage.style.display = "block";

  fetch("https://wedev-api.sky.pro/api/v1/andrew-skow/comments", {
    method: "POST",
    body: JSON.stringify({
      text: inputCommentElement.value,
      name: inputNameElement.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      fetchAndRenderAllComments();
    })
    .then((data) => {
      // очистка формы и возвращение в обычный вид
      inputNameElement.style.display = "block";
      inputCommentElement.style.display = "block";
      addCommentButtonElement.style.display = "block";
      loadingMessage.style.display = "none";
      inputNameElement.value = "";
      inputCommentElement.value = "";
    });
});
