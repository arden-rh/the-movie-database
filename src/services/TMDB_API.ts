/**
 * Service for communicating with the TMDB database
 */
import axios from 'axios'
import { Movie_Genres, Movie_Results, NowPlaying_Movies } from '../types/TMDB.types'

const API_KEY = import.meta.env.VITE_ACCESSTOKEN

// Create a new axios instance
const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': API_KEY

	}
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)

	return response.data
}

// export const getMovie = (id: string) => {
// 	return get(id)
// }

export const getNowPlayingMovies = () => {
	return get<NowPlaying_Movies>('movie/now_playing?language=en-US&page=1')
}

export const getMovieGenres = () => {
	return get<Movie_Genres>('genre/movie/list?language=en')
}
