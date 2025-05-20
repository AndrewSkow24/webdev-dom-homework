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

export const renderAutorizationForm = () => {
  const loginFormElement = document.getElementById("login-form");

  const loginFormHtml = `
        <input type="text" placeholder="Введите логин" id="input-login" class="input-login" />
        <input
          type="text"
          placeholder="Введите ваш пароль"
          id="input-password"
          class="input-password"
        />
          <button id="login-button">Войти</button>
        `;
  loginFormElement.innerHTML = loginFormHtml;

  document.getElementById("comment-list").style.display = "none";
  document.getElementById("authorization").style.display = "none";
};
