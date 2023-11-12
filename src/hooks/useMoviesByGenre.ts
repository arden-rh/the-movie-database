import { useQuery } from '@tanstack/react-query'
import { getMoviesByGenre } from '../services/TMDB_API'

const useMoviesByGenre = (movieGenreId: number, page: number) => {

	const strPage = page.toString()

	return useQuery({
		queryKey: ['movies_by_genre', { genre: movieGenreId, page: strPage }],
		queryFn: () => getMoviesByGenre(movieGenreId, page),
		enabled: !!movieGenreId,
		keepPreviousData: true
	})
}

export default useMoviesByGenre
