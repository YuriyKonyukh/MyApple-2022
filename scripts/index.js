import Swiper from '../lib/swiper-bundle.esm.browser.min.js';
//Simple-bar

new SimpleBar(document.querySelector('.country_list'))

//Slider
new Swiper('.goods_block', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },
    navigation: {
        prevEl: '.goods_arrow_prev',
        nextEl: '.goods_arrow_next'
    },
    preventClicks: true,
    a11y: false,
});
//Modal-window
const product_more = document.querySelectorAll('.product_more');
const modal = document.querySelector('.modal');

product_more.forEach((btn) => {
    btn.addEventListener('click', () => {
        modal.classList.add('modal_open')
    })
});

modal.addEventListener('click', ({target}) => {
    if (target === modal) {
        modal.classList.remove('modal_open')
    }
});

const formPlaceloder = document.querySelectorAll('.form_placeholder');
const formInput = document.querySelectorAll('.form_input');

formInput.forEach((input, i) => {
    input.addEventListener('focus', () => {
        formPlaceloder[i].classList.add('form_placeholder_active')
    })

    input.addEventListener('blur', () => {
        if (input.value === "") {
            formPlaceloder[i].classList.remove('form_placeholder_active')
        }
    })
});

// Currency

const dataCurrency = {};
const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('EU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
    }).format(value)
}

const showPrice = (currency = 'USD') => {
    const priceElems = document.querySelectorAll('[data-price]');

    priceElems.forEach(elem => {
        elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
}

const myHeaders = new Headers();
myHeaders.append("apikey", "AUw3J4dQBzbJfgjFGFtVqsCnqYNPAtEU");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates)
    showPrice();
  })
  .catch(error => console.log('error', error));

//Country-choice

const countryBtn = document.querySelector('.country_btn');
const countryWrapper = document.querySelector('.country_wrapper');

countryBtn.addEventListener('click', () => {
    countryWrapper.classList.toggle('country_wrapper_open')
});

countryWrapper.addEventListener('click', ({target}) => {
    if (target.classList.contains('country_choice')) {
        countryWrapper.classList.remove('country_wrapper_open');
        showPrice(target.dataset.currency);
    }
});