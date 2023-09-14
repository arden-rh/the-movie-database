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

export const getNowPlayingMovies = (page: number) => {
	return get<NowPlaying_Movies>(`movie/now_playing?include_adult=false&language=en-US&page=${page}`)
}

export const getTrendingMovies = (page: number) => {
	return get<Movie_Results>(`trending/movie/day?include_adult=false&language=en-US&page=${page}`)
}

export const getTopRatedMovies = (page: number) => {
	return get<Movie_Results>(`movie/top_rated?include_adult=false&language=en-US&page=${page}`)
}

export const getMoviesByGenre = (genre: number, page: number) => {
	return get<Movie_Results>(`discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`)
}

export const getMovieGenres = () => {
	return get<Movie_Genres>('genre/movie/list?language=en')
}
