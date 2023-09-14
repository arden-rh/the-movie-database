import { getTopRatedMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../components/MovieGrid'

const TopMoviesPage = () => {

	const useTopRatesMovies = ( page: number ) => {
		return useQuery(['top_rated'], () => getTopRatedMovies(page))
	}

	const { data } = useTopRatesMovies(1)

	return (
		<>
			<h1>Top Rated Movies of All Time</h1>

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default TopMoviesPage
