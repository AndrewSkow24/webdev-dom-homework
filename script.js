const addCommentButtunElement = document.getElementById("add-comment-button");
addCommentButtunElement.classList.add("inactive");
addCommentButtunElement.disabled = true;

const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");
const commentListElemnet = document.getElementById("comment-list");

const commentsListData = [
  {
    name: "Глеб Фокин",
    formattedDateTime: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLikeActive: false,
  },
  {
    name: "Варвара Н.",
    formattedDateTime: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLikeActive: true,
  },
];

// инициализация кнопки лайка

const likeButtonEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      currentIndexElement = likeButton.dataset.index;
      commentsListData[currentIndexElement].isLikeActive =
        !commentsListData[currentIndexElement].isLikeActive;

      if (!commentsListData[currentIndexElement].isLikeActive) {
        commentsListData[currentIndexElement].likes -= 1;
        likeButton.classList.remove("-active-like");
      } else {
        commentsListData[currentIndexElement].likes += 1;
        likeButton.classList.add("-active-like");
      }
      renderListComments();
    });
  }
};

// функция отображени

const renderListComments = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  const commentsHtml = commentsListData
    .map((comment, index) => {
      // console.log(comment);
      return `
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.formattedDateTime}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${comment.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${
        comment.isLikeActive ? "-active-like" : ""
      }"></button>
            </div>
          </div>
        </li>
    `;
    })
    .join("");

  commentListElemnet.innerHTML = commentsHtml;

  likeButtonEventListeners();
};

renderListComments();

// функция проверки заполненности полей
const checkInputs = () => {
  const isNameFilled = inputNameElement.value !== "";
  const isCommentFilled = inputCommentElement.value !== "";

  if (isNameFilled == true) {
    console.log("Какое-то имя введно");
    inputNameElement.classList.remove("error");
  } else {
    console.log("Поле ввода имени пустое");
    inputNameElement.classList.add("error");
    inputNameElement.placeholder = "Имя не может быть пустым";
  }

  if (isCommentFilled == true) {
    console.log("Комментарий введён");
    inputCommentElement.classList.remove("error");
  } else {
    console.log("Комментарий пустой");
    inputCommentElement.classList.add("error");
    inputCommentElement.placeholder = "Комментарий не может быть пустым!";
  }

  addCommentButtunElement.disabled = !(isNameFilled && isCommentFilled);
  if (addCommentButtunElement.disabled) {
    addCommentButtunElement.classList.add("inactive");
  } else {
    addCommentButtunElement.classList.remove("inactive");
  }
};

// проверка полей при вводе
inputNameElement.addEventListener("input", checkInputs);
inputCommentElement.addEventListener("input", checkInputs);

// функция добавления комментария
const addComment = () => {
  const currentDate = new Date();
  const formattedDateTime = currentDate
    .toLocaleString("ru-Ru", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/,/, "");

  commentListElemnet.innerHTML += `
        <li class="comment">

    <div class="comment-header">
      <div>${inputNameElement.value}</div>
      <div>${formattedDateTime}</div>
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

  // очищение полей ввода
  inputNameElement.value = "";
  inputCommentElement.value = "";
  addCommentButtunElement.classList.add("inactive");
};

// вешаем функцию на кнопку
addCommentButtunElement.addEventListener("click", addComment);

// навешивание клавиши enter
const handleKeyPress = (e) => {
  if (e.key == "Enter" && !addCommentButtunElement.disabled) {
    addComment();
  }
};

document.addEventListener("keypress", handleKeyPress);

// функция удаления последнего комментария

const deleteButton = document.getElementById("delete-comment-button");

deleteButton.addEventListener("click", () => {
  const lastComment = commentListElemnet.lastElementChild;
  console.log(lastComment);
  commentListElemnet.removeChild(lastComment);
});

// д3 2
