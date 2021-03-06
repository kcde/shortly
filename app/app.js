const urlForm = document.querySelector('.url-form');
let ap2 = '9d2ece407';
const shortLinksContainer = document.querySelector('.shortened-links');
const urlInput = document.querySelector('.url-input');
const submitBtn = document.querySelector('.submit');
let ap1 = '220dd7';

const copyBtn = document.querySelector('.copy');
const mainLink = document.querySelector('.main-link');
const shortLink = document.querySelector('.shortLink');
const errorText = document.querySelector('.error-text');

// creating local storage key and get localStorage object
const localStorageLinksKey = 'links.list';
const generatedLinksList = JSON.parse(localStorage.getItem(localStorageLinksKey)) || [];
let ap3 = 'e909022e5';
// function to create shortened links template
const createTemplate = (response) => {
    if (response.destination.length > 25) {
        response.destination = response.destination.slice(0, 25) + '.....';
    }
    const template = `
  <div class="link">
  <p class="main-link">${response.destination}</p>
  <div class="shortened-link">
      <a
          href=https://${response.shortUrl} target="_blank"
          class="short-link"
          >https://${response.shortUrl}</a
      >
      <i class="fas fa-clone copy-icon"></i>

  </div>
  </div>
  `;
    return template;
};

// to render any data in localStorage
const render = () => {
    generatedLinksList.forEach((obj) => {
        shortLinksContainer.innerHTML += createTemplate(obj);
    });
};
let ap4 = '02a6706e';

if (generatedLinksList) {
    render();
}

const getShortUrl = async (inputValue) => {
    let destination = inputValue;
    const endpoint = 'https://api.rebrandly.com/v1/links';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: ap1 + ap2 + ap3 + ap4,
            },
            body: JSON.stringify({ destination: destination }),
        });

        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }

        throw new Error('Request Failed');
    } catch (error) {
        console.log(error);
    }
};

urlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // accomodatiing www for the api
    let inputValue;
    if (urlInput.value.slice(0, 3) === 'www') {
        console.log(urlInput.value);
        inputValue = `https://${urlInput.value}`;
        console.log(inputValue);
    } else {
        inputValue = urlInput.value;
    }

    const regex = /(https:?)(\/\/)[^\.]*\w+(\.[A-Za-z]+)\/?.*?$/gi;
    if (inputValue.trim() === '') {
        urlInput.style.border = '3px solid orange';
        if (errorText.classList.contains('show-error')) {
            errorText.classList.remove('show-error');
        }
    } else if (!regex.test(inputValue)) {
        if (urlInput.style.border != 'none') {
            urlInput.style.border = 'none';
        }
        errorText.classList.add('show-error');
    } else {
        errorText.classList.remove('show-error');
        urlInput.style.border = 'none';

        getShortUrl(inputValue).then((info) => {
            //saving
            generatedLinksList.push({ destination: info.destination, shortUrl: info.shortUrl });
            localStorage.setItem(localStorageLinksKey, JSON.stringify(generatedLinksList));
            shortLinksContainer.innerHTML += createTemplate(info);
            urlInput.value = 'https://' + info.shortUrl;
            console.log(urlInput.value);

            submitBtn.classList.add('dn');
            copyBtn.classList.remove('dn');
        });
    }
});

copyBtn.addEventListener('click', () => {
    urlInput.select();
    document.execCommand('copy');
    submitBtn.classList.remove('dn');
    copyBtn.classList.add('dn');
    urlInput.value = '';
});

// one hell of traversing
shortLinksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-icon')) {
        window.navigator.clipboard.writeText(e.target.parentElement.firstElementChild.innerHTML);
    }
});
