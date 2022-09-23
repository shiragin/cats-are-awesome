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
    // console.log(data);
    // data.forEach(element => {
    //   breedsArray.push(element.name);
    // });

    breedsArray = data;

    for (let i = 0; i < breedsArray.length; i++) {
      const breed = breedsArray[i];
      const option = document.createElement('option');
      if (!breed.image) continue;
      option.value = i;
      option.innerText = breed.name;
      select.appendChild(option);
    }
    // showBreedImage(0);
  });

// Adds a cat picture

function addCat(url) {
  // show loading spinner
  catImg.classList.add('hidden');
  spinner.classList.remove('hidden');
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // const img = document.createElement('img');
      catImg.src = data[0].url;
      catImg.alt = 'cute kittie';

      // if (!d)

      // document.querySelector('.cats').appendChild(img);

      // stop showing loading spinner
      spinner.classList.add('hidden');
      catImg.classList.remove('hidden');
    });
}

addCat(CAT_URL);

document.querySelector('.add-cats').addEventListener('mousedown', function () {
  addCat(CAT_URL);
});

select.addEventListener('change', function (event) {
  console.log(event.target.value);
  selectedBreed = breedsArray[event.target.value];
  console.log(selectedBreed.id);
  selectedURL = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed.id}`;
  addCat(selectedURL);
});
