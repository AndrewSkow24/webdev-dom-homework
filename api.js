import { renderComments } from "./render.js";

export const fetchAndRenderAllComments = (
  commentsListElement,
  commentsArray
) => {
  commentsListElement.textContent = "Подождите, комментарии загружаются ...";
  return fetch("https://wedev-api.sky.pro/api/v1/andrew-skow/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      commentsArray = responseData.comments;
      renderComments(commentsListElement, commentsArray);
    });
};

export const addComment = (
  addCommentButtonElement,
  inputNameElement,
  inputCommentElement,
  commentsArray,
  commentsListElement
) => {
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
        forceError: true,
      }),
    })
      .then((response) => {
        if (response.status == 201) {
          return response.json();
        } else if (response.status == 400) {
          throw new Error(
            "Ошибка пользовательского ввода, слишком короткая строка"
          );
        } else {
          throw new Error("Упал сервер");
        }
      })
      .then((responseData) => {
        fetchAndRenderAllComments(commentsListElement, commentsArray);
      })
      .then((data) => {
        // очистка формы и возвращение в обычный вид
        inputNameElement.style.display = "block";
        inputCommentElement.style.display = "block";
        addCommentButtonElement.style.display = "block";
        loadingMessage.style.display = "none";
        inputNameElement.value = "";
        inputCommentElement.value = "";
      })
      .catch((error) => {
        alert(`Произошла ошибка, повторите позже: ${error} `);
        inputNameElement.style.display = "block";
        inputCommentElement.style.display = "block";
        addCommentButtonElement.style.display = "block";
        loadingMessage.style.display = "none";
      });
  });
};
