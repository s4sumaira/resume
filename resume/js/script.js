let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
  images.onclick = () => {
    var src = images.getAttribute('src');
    document.querySelector('.main-home-image').src = src;
  };
});
function validateInput() {
  const amountInput = document.getElementById('sourceAmount');
  const maxLength = 7; // Set your desired maximum length

  if (amountInput.value.length > maxLength) {
    amountInput.value = amountInput.value.slice(0, maxLength);
  }
}

populateCurrencyDropdown(); 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
   
        showSlides(slideIndex += n);
    
 
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


async function populateCurrencyDropdown() {
  const response = await fetch('https://www.floatrates.com/daily/gbp.json');
  const currencies = await response.json();

  const dropdown = document.getElementById('targetCurrency');

  // Populate the dropdown with currency options
  Object.keys(currencies).forEach(currencyCode => {
    const option = document.createElement('option');
    option.value = currencyCode;
    option.text = currencies[currencyCode].name;
    dropdown.appendChild(option);
  });
}



async function convertCurrency() {
  const sourceCurrency = document.getElementById('sourceCurrency').value.toUpperCase();
  const destinationCurrency = document.getElementById('targetCurrency').value;
  const amount = document.getElementById('sourceAmount').value;

  try {
    const response = await fetch(`https://www.floatrates.com/daily/${sourceCurrency}.json`);
    const data = await response.json();

    if (data[destinationCurrency]) {
      const exchangeRate = data[destinationCurrency].rate;

      if (isNaN(amount) || amount <= 0) {
        document.getElementById('error').innerText = 'Please enter a valid positive amount.';
        document.getElementById('result').innerText = '';
      } else {
        document.getElementById('error').innerText = '';
        const convertedAmount = (amount * exchangeRate).toFixed(3);
        const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'GMT' });

        const resultMessage = `Amount of transaction: ${amount} ${sourceCurrency} = ${convertedAmount} ${destinationCurrency}<br>
                                 Current Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate} ${destinationCurrency}<br>
                                 <i>Calculation Timestamp: ${timestamp}</i>`;

        document.getElementById('result').innerHTML = resultMessage;
      }
    } else {
      document.getElementById('error').innerText = 'Invalid destination currency.';
      document.getElementById('result').innerText = '';
    }
  } catch (error) {
    document.getElementById('error').innerText = 'Error fetching exchange rate data.';
    document.getElementById('result').innerText = '';
  }
}

function showConverter() {
  document.getElementById("currenyconverter").style.display = 'block';
  document.getElementById("forecaster").style.display = 'none';
}
function showForecaster() {
  document.getElementById("currenyconverter").style.display = 'none';
  document.getElementById("forecaster").style.display = 'block';
}

const maxLength = 500;
const textarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', function () {
  const message = this.value;
  const remaining = maxLength - message.length;
  const displayCount = Math.max(0, remaining);

  charCount.textContent = `${displayCount} characters remaining`;

  if (displayCount === 0) {
    charCount.style.color = 'red';
  } else {
    charCount.style.color = 'black';
  }
  this.value = message.slice(0, maxLength);
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const token = grecaptcha.getResponse(); 

  if (!token) {
    alert('Please complete the reCAPTCHA!');
    return; 
  }

 
  console.log('reCAPTCHA token:', token);
});

