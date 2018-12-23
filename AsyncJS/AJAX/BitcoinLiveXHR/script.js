const btn = document.querySelector('button');
const price = document.querySelector('#price');

document.addEventListener('DOMContentLoaded', () => {
  updatePrice ();
});

btn.addEventListener('click', () => {
  updatePrice ();

});

function updatePrice () {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function (){
    if (XHR.readyState == 4 && XHR.status == 200){
      const currency = document.querySelector("input[name='currency']:checked").value;
      const rate = JSON.parse (XHR.responseText).bpi[currency].rate;
      price.textContent = `${rate} ${currency}`;
    }
  }

  XHR.open('GET','https://api.coindesk.com/v1/bpi/currentprice.json');
  XHR.send();
}