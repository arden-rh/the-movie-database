import { useQuery } from '@tanstack/react-query'
import { getMovieGenres } from '../services/TMDB_API'

const useMovieGenres = () => {
	return useQuery(['movie_genres'], getMovieGenres)
}

export default useMovieGenres
