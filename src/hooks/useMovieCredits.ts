import { getMovieCastCredits } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'

const useMovieCredits = (movieId: number) => {
	return useQuery(['movie-credits', { id: movieId }], () => getMovieCastCredits(movieId))
}

export default useMovieCredits
