import { fetchBreeds } from './cat-api'
import { fetchCatByBreed } from './cat-api'

const selectBreeds = document.querySelector('.breed-select');
const messageWait = document.querySelector('.loader');
const messageError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function onMessageWait() { messageWait.style.display = '';}
function onMessageError() {messageError.style.display = '';}
function offMessageWait() {messageWait.style.display = 'none';}
function offMessageError() { messageError.style.display = 'none'; }

catInfo.style.marginTop = '15px';
catInfo.style.display = 'flex';
catInfo.style.gap = '15px';

selectBreeds.addEventListener('change', handlerSelectBreeds)
function handlerSelectBreeds() {
  catInfo.innerHTML = '';

  const breedId = selectBreeds.value;

  if (breedId === '-1') {
    offMessageWait();
    return;
  }

  onMessageWait();
  offMessageError();

  fetchCatByBreed(breedId)
    .then(result => {
      offMessageWait();

      if (result.data.length === 0) {
        console.log('error');
        throw new Error("result is empty");
      }

      const breedImgUrl = result.data[0].url;
      const breedName = result.data[0].breeds[0].name;
      const breedDescription = result.data[0].breeds[0].description;
      const breedTemperament = result.data[0].breeds[0].temperament;

      let markupCatInfo = '';

      markupCatInfo = markupCatInfo +
        `<div style="width:600px;">
          <img src="${breedImgUrl}" alt="${breedName}" width=600 />
        </div> `;
      
      markupCatInfo = markupCatInfo +
        `<div  style="width:600px;">
          <h2>${breedName}</h2>
          <p>${breedDescription}</p>
          <p><b>Temperament : </b>${breedTemperament}</p>
        </div> `;

      catInfo.innerHTML = markupCatInfo;

    })
    .catch(error => {
      offMessageWait();
      onMessageError();
  })
  

}

onMessageWait();
offMessageError();

fetchBreeds()
  .then(result => {
    if (result.data.length === 0) {
      console.log('error');
      throw new Error("result is empty");
    }

    let markupSelectBreeds = `<option value="-1">-- Select breed --</option> `;
    
    markupSelectBreeds += result.data.map(item => {
      return `<option value="${item.id}">${item.name}</option>`
    }).join(" ");

    selectBreeds.innerHTML = markupSelectBreeds;

    offMessageWait();
    offMessageError();
  })
  .catch(error => {
    offMessageWait();
    onMessageError();
  })


/*
console.log(response);
response
    .then(result => console.log(result.data))
    .catch(error => console.log(error))
*/

/*
fetchFullPath = `"${CAT_HOST}${breedsPath}?x-api-key=${X_API_KEY}"`
console.log(fetchFullPath);

let request = fetch(fetchFullPath)
console.log(request);
request
    .then(result => console.log(result))
    .catch(error => console.log(error))


    
  .then(response => {
      console.log(response.ok);
      console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
      console.log("ERROR");
      console.log(error);
  });
*/

/*
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
      }
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
      console.log("ERROR");
      console.log(error);
  });
*/