import { useQuery } from '@tanstack/react-query'
import { getMovieGenres } from '../services/TMDB_API'

const HomePage = () => {

	const useMovieGenres = () => {
		return useQuery(['movie_genres'], getMovieGenres)
	}

	const {
		data,
		isError,
	} = useMovieGenres()


	return (
		<>
		<h1>Home Page</h1>

		{data && data.genres.map(genre => <h2>{genre.name}</h2>)}

		</>
	)
}

export default HomePage
