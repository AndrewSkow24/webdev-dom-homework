// loginApi.js

const baseUrl = "https://wedev-api.sky.pro/api/user";

let usersArr = [];

// получить список пользователей (get)
const getUsers = () => {
  fetch(baseUrl, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      usersArr = responseData.users;
      renderUsers();
    });
};

getUsers();

const renderUsers = () => {
  const listUsers = document.getElementById("users");

  listUserHtml = usersArr
    .map((user) => {
      return `
        <li>${user.login}</li>
    `;
    })
    .join("");

  listUsers.innerHTML = listUserHtml;
};
