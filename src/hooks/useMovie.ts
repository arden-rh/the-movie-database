import { getMovie } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'

const useMovie = (movieId: number) => {
	return useQuery(['movie', { id: movieId }], () => getMovie(movieId))
}

export default useMovie
