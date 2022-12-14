const CAT_URL = 'https://api.thecatapi.com/v1/images/search';

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const select = document.querySelector('.breeds');
const spinner = document.querySelector('.spinner');
let breedsArray = [];
let catImg = document.querySelector('.cat');
let catDesc = document.querySelector('.desc');

// Get breeds & select menu
fetch(BREEDS_URL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    data = data.filter(img => img.image?.url != null);

    breedsArray = data;

    for (let i = 0; i < breedsArray.length; i++) {
      const breed = breedsArray[i];
      const option = document.createElement('option');
      if (!breed.image) continue;
      option.value = i;
      option.innerText = breed.name;
      select.appendChild(option);
    }
  });

// Adds a cat picture

function addCat(url, desc) {
  // show loading spinner
  catImg.classList.add('hidden');
  catDesc.classList.add('hidden');
  spinner.classList.remove('hidden');
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      catImg.src = data[0].url;
      catImg.alt = 'cute kittie';

      if (desc) {
        catDesc.innerText = desc;
      } else {
        catDesc.innerText = '';
      }

      // // stop showing loading spinner
      // spinner.classList.add('hidden');
      // catImg.classList.remove('hidden');
      // setTimeout(function () {
      //   catDesc.classList.remove('hidden');
      // }, 6000);
    });
}

addCat(CAT_URL);

document.querySelector('.add-cats').addEventListener('mousedown', function () {
  addCat(CAT_URL);
});

select.addEventListener('change', function (event) {
  let selectedBreed = breedsArray[event.target.value];
  let selectedURL = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed.id}`;
  let selectedDesc = selectedBreed.description;
  addCat(selectedURL, selectedDesc);
});

catImg.addEventListener('load', function () {
  // stop showing loading spinner
  spinner.classList.add('hidden');
  catImg.classList.remove('hidden');
  catDesc.classList.remove('hidden');
});
