import React from 'react'
import MovieGrid from '../components/MovieGrid'
import { useQuery } from '@tanstack/react-query'
import { getNowPlayingMovies } from '../services/TMDB_API'


const LatestMoviesPage = () => {

	const useLastestMovies = () => {
		return useQuery(['now_playing'], getNowPlayingMovies)
	}

	const { data } = useLastestMovies()

	return (
		<>
			{data && <MovieGrid data={data.results} />}
		</>
	)
}

export default LatestMoviesPage
