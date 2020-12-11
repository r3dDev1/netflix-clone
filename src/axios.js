import axios from 'axios';

// ** base url for making request to the API TMDB
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

// ** instance.get('/files')
// ** result --> https://api.themoviedb.org/3/files'

export default instance;