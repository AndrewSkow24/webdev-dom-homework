export const renderComments = (commentsListElement, commentsArray) => {
  const commentsHtml = commentsArray
    .map((comment) => {
      const commentDate = new Date(comment.date);
      const formattedString =
        commentDate.toLocaleDateString("ru-Ru") +
        " " +
        commentDate.toLocaleTimeString("ru-RU");
      return `
       <li class="comment" data-id=${comment.id}">
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
