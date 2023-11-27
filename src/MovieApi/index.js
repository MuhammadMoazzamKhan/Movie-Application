import axios from 'axios';
import { API_KEY } from '../Content/index';


const apiBaseURL = 'https://api.themoviedb.org/3';

// Dynamic Path

const trendingMovieEndPoint = `${apiBaseURL}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovieEndPoint = `${apiBaseURL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovieEndPoint = `${apiBaseURL}/movie/top_rated?api_key=${API_KEY}`;
const searchMovieEndPoint = `${apiBaseURL}/search/movie?api_key=${API_KEY}`

// Movie detials

const movieDetailEndPoint = id => `${apiBaseURL}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndPoint = id => `${apiBaseURL}/movie/${id}/credits?api_key=${API_KEY}`
const similarmovieEndPoint = id => `${apiBaseURL}/movie/${id}/similar?api_key=${API_KEY}`

// Person Deatils

const personDetailsEndPoint = id => `${apiBaseURL}/person/${id}?api_key=${API_KEY}`
const personMovieCreditsEndPoint = id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${API_KEY}`


// Domi Image
export const fallBackDomiPosterImage = 'https://image.lexica.art/full_webp/0e1358c4-295a-44af-b5a5-13656cac1e5b'
export const fallBackPorfileImage = 'https://image.lexica.art/full_webp/0e6fd167-be1d-4422-b8c9-eb6da336cf94'

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endPoint, params) => {
    const option = await {
        method: 'GET',
        url: endPoint,
        params: await params ? params : {}
    }
    try {
        const res = await axios.request(option);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchTrendingMovie = () => {
    return apiCall(trendingMovieEndPoint);
}
export const fetchUpcomingMovie = () => {
    return apiCall(upcomingMovieEndPoint);
}
export const fetchTopRatedMovie = () => {
    return apiCall(topRatedMovieEndPoint);
}


export const fetchMovieDetails = id => {
    return apiCall(movieDetailEndPoint(id));
};
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndPoint(id));
};
export const fetchSimilarMovies = id => {
    return apiCall(similarmovieEndPoint(id));
};
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndPoint(id));
};
export const fetchPersonCreditsMovie = id => {
    return apiCall(personMovieCreditsEndPoint(id));
};
export const searchMovies = params => {
    return apiCall(searchMovieEndPoint, params);
};