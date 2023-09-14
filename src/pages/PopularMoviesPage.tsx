import { getTrendingMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../components/MovieGrid'

const PopularMoviesPage = () => {

	const useTrendingMovies = ( page: number ) => {
		return useQuery(['trending'], () => getTrendingMovies(page))
	}

	const { data } = useTrendingMovies(1)

	return (
		<>
			<h1>The Trending Movies</h1>

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default PopularMoviesPage
