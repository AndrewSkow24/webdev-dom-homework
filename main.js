import { renderComments, renderAutorizationForm } from "./render.js";
import { fetchAndRenderAllComments, addComment } from "./api.js";

const commentsListElement = document.getElementById("comment-list");
const addCommentButtonElement = document.getElementById("add-comment-button");
const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");
const commentAddForm = document.getElementById("comment-add-form");
const autorizationLink = document.getElementById("autorization-link");
const loginApiUrl = "https://wedev-api.sky.pro/api/user/login";

const hideAddingForm = () => {
  commentAddForm.style.display = "none";
};

hideAddingForm();

export let userToken = "";

export const setUserToken = (token) => {
  userToken = `Bearer ${token}`;
};

let commentsArray = [];

fetchAndRenderAllComments(commentsListElement, commentsArray);

renderComments(commentsListElement, commentsArray);

addComment(
  addCommentButtonElement,
  inputNameElement,
  inputCommentElement,
  commentsArray,
  commentsListElement
);

autorizationLink.addEventListener("click", () => {
  renderAutorizationForm();

  const inputLogin = document.getElementById("input-login");
  const InputPassword = document.getElementById("input-password");
  const buttonLogin = document.getElementById("login-button");

  buttonLogin.addEventListener("click", () => {
    console.log(userToken);
    fetch(loginApiUrl, {
      method: "POST",

      body: JSON.stringify({
        login: inputLogin.value,
        password: InputPassword.value,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Неверное имя пользователя или пароль");
        }
      })
      .then((responseData) => {
        setUserToken(responseData.user.token);
        console.log(responseData.user);
        inputNameElement.placeholder = responseData.user.name;
      })
      .then(() => {
        commentsListElement.style.display = "flex";
        commentAddForm.style.display = "flex";
        document.getElementById("authorization").style.display = "none";
        document.getElementById("login-form").style.display = "none";
      })
      .catch((error) => {
        alert(error);
      });
  });
});
