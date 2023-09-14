import { getNowPlayingMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../components/MovieGrid'


const LatestMoviesPage = () => {

	const useLastestMovies = ( page: number ) => {
		return useQuery(['now_playing'], () => getNowPlayingMovies(page))
	}

	const { data } = useLastestMovies(1)

	return (
		<>
			<h1>The Latest Movies</h1>

			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default LatestMoviesPage
