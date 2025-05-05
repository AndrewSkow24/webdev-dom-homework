const addCommentButtunElement = document.getElementById("add-comment-button");
console.log(addCommentButtunElement);

addCommentButtunElement.addEventListener("click", () => {
  let commentListElemnet = document.getElementById("comment-list");
  const inputNameElement = document.getElementById("input-name");
  const inputCommentElement = document.getElementById("input-comment");
  const currentDate = new Date();

  inputNameElement.classList.remove("error");
  inputCommentElement.classList.remove("error");

  if (inputNameElement.value == "") {
    alert("Имя не может быть пустым!");
    inputNameElement.classList.add("error");
    return;
  }
  if (inputCommentElement.value == "") {
    alert("Комментарий не может быть пустым");
    inputCommentElement.classList.add("error");
    return;
  }

  commentListElemnet.innerHTML += `
          <li class="comment">
          <div class="comment-header">
            <div>${inputNameElement.value}</div>
            <div>${
              currentDate.toLocaleDateString("Ru-ru") +
              " " +
              currentDate.toLocaleTimeString("ru")
            }</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${inputCommentElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button -active-like"></button>
            </div>
          </div>
        </li>
  `;
});
