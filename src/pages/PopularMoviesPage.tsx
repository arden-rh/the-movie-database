import { getTrendingMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../components/MovieGrid'

const PopularMoviesPage = () => {

	const useTrendingMovies = (page: number) => {
		return useQuery(['trending'], () => getTrendingMovies(page))
	}

	const { data, isError, isFetching } = useTrendingMovies(1)

	return (
		<>
			<div className='category-page-hero'>
				<h1>The Trending Movies</h1>
			</div>

			{isError && <span>Something went wrong with the request</span>}

			{isFetching && <span>Loading...</span>}

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default PopularMoviesPage
