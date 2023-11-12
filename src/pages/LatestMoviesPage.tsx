import MovieGrid from '../components/MovieGrid'
import useLatestMovies from '../hooks/useLatestMovies'

const LatestMoviesPage = () => {

	const { data, isError, isFetching } = useLatestMovies(1)

	return (
		<>
			<div className='category-page-hero'>
				<h1>The Latest Movies</h1>
			</div>

			{isError && <span>Something went wrong with the request</span>}

			{isFetching && <span>Loading...</span>}

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default LatestMoviesPage
