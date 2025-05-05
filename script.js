const addCommentButtunElement = document.getElementById("add-comment-button");
console.log(addCommentButtunElement);

addCommentButtunElement.addEventListener("click", () => {
  alert("Меня нажали");
  let commentListElemnet = document.getElementById("comment-list");
  const inputNameElement = document.getElementById("input-name");
  const inputCommentElement = document.getElementById("input-comment");
  const currentDate = new Date();
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
