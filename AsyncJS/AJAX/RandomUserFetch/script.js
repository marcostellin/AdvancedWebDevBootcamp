const btn = document.querySelector('#btn');
const url = 'https://randomuser.me/api/';
const avatarField = document.querySelector('#avatar');
const fullnameField = document.querySelector('#fullname');
const usernameField = document.querySelector('#username');
const emailField = document.querySelector('#email');
const cityField = document.querySelector('#city');

btn.addEventListener('click', () => {
  fetch(url)
  .then(handleErrors)
  .then(parseJSON)
  .then(updateProfile)
  .catch(printError);
});

function handleErrors (response) {
  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
}

function parseJSON (response) {
  return response.json();
}

function updateProfile (data) {

  const user = data.results[0];

  avatarField.src = user.picture.medium;
  fullnameField.innerText = user.name.first + ' ' + user.name.last;
  usernameField.innerText = user.login.username;
  emailField.innerText = user.email;
  cityField.innerText = user.location.city;

}

function printError (error) {
  console.log (error);
}