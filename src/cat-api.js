import axios from "axios";

const CAT_HOST = "https://api.thecatapi.com/v1/"
const X_API_KEY = "live_0IQWce4WbNmoqtAs3kTHe06R5MZAUV9PiU9bquPLSDgD80waaM9XHuOvV79J69l4"

const breedsPath = "breeds"
const imageSearchPath = "images/search"

axios.defaults.headers.common['x-api-key'] = X_API_KEY

export function fetchBreeds() {
    return axios.get(CAT_HOST + breedsPath);
}

export function fetchCatByBreed(breedId) {
    return axios.get(CAT_HOST + imageSearchPath+'?breed_ids='+breedId);
}