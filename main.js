import { renderComments } from "./render.js";
import { fetchAndRenderAllComments, addComment } from "./api.js";

const commentsListElement = document.getElementById("comment-list");
const addCommentButtonElement = document.getElementById("add-comment-button");
const inputNameElement = document.getElementById("input-name");
const inputCommentElement = document.getElementById("input-comment");

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
