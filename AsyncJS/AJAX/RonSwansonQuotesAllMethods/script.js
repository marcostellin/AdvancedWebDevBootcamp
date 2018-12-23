const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quoteField = document.querySelector('#quote');

// XHR request
const XHRbtn = document.querySelector('#xhr');

XHRbtn.addEventListener('click', () => {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200){
      quoteField.innerText = JSON.parse( XHR.responseText )[0];
    }
  };

  XHR.open('GET', url);
  XHR.send();
});

//Fetch request
const fetchBtn = document.querySelector('#fetch');

fetchBtn.addEventListener('click', () => {

  fetch(url)
  .then(handleErrors)
  .then(parseData)
  .then(updateQuote)
  .catch(printErrors);
})

function handleErrors(res) {
  if(!res.ok) {
    throw Error(res.status);
  }

  return res;
}

function parseData(res) {
  return res.json();
}

function updateQuote(data) {
  quoteField.innerText = data[0];
}

function printErrors(err) {
  console.log('Error Fetch!');
}

// JQuery request
$('#jquery').click( () => {

  $.getJSON(url)
  .done( (data) => {
    $('#quote').text(data[0]);
  })
  .fail( () => {
    console.log('Error JQuery!');
  })

});


// Axios request
const axiosBtn = document.querySelector('#axios');

axiosBtn.addEventListener('click', () => {
  axios.get(url)
  .then( (res) => {
    quoteField.innerText = res.data[0];
  })
  .catch( (error) => {
    if (error.response) {
      console.log('Error Axios Response!');
    } else if (error.request) {
      console.log('Error Axios Request!');
    } else {
      console.log('Error Axios');
    }
  })
});

