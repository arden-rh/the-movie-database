import { getTopRatedMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../components/MovieGrid'

const TopMoviesPage = () => {

	const useTopRatesMovies = (page: number) => {
		return useQuery(['top_rated'], () => getTopRatedMovies(page))
	}

	const { data, isError, isFetching } = useTopRatesMovies(1)

	return (
		<>
			<h1>Top Rated Movies of All Time</h1>

			{isError && <span>Something went wrong with the request</span>}

			{isFetching && <span>Loading...</span>}

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default TopMoviesPage
