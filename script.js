const addCommentButtunElement = document.getElementById("add-comment-button");
addCommentButtunElement.classList.add("inactive");
addCommentButtunElement.disabled = true;

const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");
const commentListElemnet = document.getElementById("comment-list");

const deleteButton = document.getElementById("delete-comment-button");

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

// инициализация каждого комментария
const initCommentEl = () => {
  const comments = document.querySelectorAll(".comment");

  for (const comment of comments) {
    comment.addEventListener("click", () => {
      const index = comment.dataset.index;

      // alert(`Вы нажали на коммент, индекс: ${index}`);
      inputCommentElement.value =
        commentsListData[index].name +
        "\n>> " +
        commentsListData[index].comment +
        "\n\n";
    });
  }
};

// инициализация кнопки лайка
const likeButtonEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      currentIndexElement = likeButton.dataset.index;
      commentsListData[currentIndexElement].isLikeActive =
        !commentsListData[currentIndexElement].isLikeActive;
      event.stopPropagation();
      if (!commentsListData[currentIndexElement].isLikeActive) {
        commentsListData[currentIndexElement].likes -= 1;
      } else {
        commentsListData[currentIndexElement].likes += 1;
      }
      renderListComments();
    });
  }
};

const editCommentButtonEventListeners = () => {
  /*
  Что нужно сделать:
  Пользователь должен иметь возможность отредактировать любой уже написанный комментарий.
  Для этого под каждым комментарием должна появиться кнопка «Редактировать».
  При клике на кнопку «Редактировать», текст комментария должен замениться полем ввода в формате textarea, а кнопка «Редактировать» должна быть заменена на кнопку «Сохранить».
  В поле ввода должен быть автоматически подставлен текущий текст комментария для удобного редактирования.
  Пользователь может внести изменения в текст комментария, используя поле ввода.
  При клике на кнопку «Сохранить» введённые изменения должны быть сохранены в массив данных, а интерфейс должен вернуться в исходное состояние.
*/

  const editCommentButtons = document.querySelectorAll(".edit-comment-button");

  for (const editCommentButton of editCommentButtons) {
    editCommentButton.addEventListener("click", () => {
      const index = editCommentButton.dataset.index;

      const commentText = document.querySelector(
        `.comment-text[data-index="${index}"]`
      );
    });
  }
};

// функция отображения элементов массива
const renderListComments = () => {
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
            <div class="comment-text" data-index="${index}">
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
          <button data-index="${index}" class="edit-comment-button">
            Редактировать
          </button>
        </li>
    `;
    })
    .join("");

  commentListElemnet.innerHTML = commentsHtml;
  initCommentEl();
  likeButtonEventListeners();
  editCommentButtonEventListeners();
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

  commentsListData.push({
    name: inputNameElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
    formattedDateTime: formattedDateTime,
    comment: inputCommentElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
    likes: 0,
    isLikeActive: false,
  });

  renderListComments();

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

deleteButton.addEventListener("click", () => {
  commentsListData.pop();
  renderListComments();
});
