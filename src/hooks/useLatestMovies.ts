import { getNowPlayingMovies } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'

const useLatestMovies = (page: number) => {
	return useQuery(['now_playing'], () => getNowPlayingMovies(page))
}

export default useLatestMovies
