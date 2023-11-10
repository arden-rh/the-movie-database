import { getMoviesByGenre } from '../services/TMDB_API'
import { Movie_Genre, Movie_Results } from '../types/TMDB_Movie.types'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import MovieGrid from '../components/MovieGrid'
import useMovieGenres from '../hooks/useMovieGenres'

const MovieGenrePage = () => {

	const { genre } = useParams()

	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [loadingMovies, setLoadingMovies] = useState(false)
	const [movieGenre, setMovieGenre] = useState<string>('')
	const [movieGenreId, setMovieGenreId] = useState<number>(0)
	const [moviesData, setMoviesData] = useState<Movie_Results | null>(null)

	const { data } = useMovieGenres()

	const { data: movies, isError, isFetching } = useQuery({
		queryKey: ['movies_by_genre', { genre: movieGenreId }],
		queryFn: () => getMoviesByGenre(movieGenreId, 1),
		enabled: !!movieGenreId
	})

	const findGenreId = useCallback((data: Movie_Genre[]) => {

		setErrorMsg(null)

		try {
			const chosenGenre = data.find((movie) => {
				return movie.name.toLowerCase().split(" ").join('-') === movieGenre
			})

			if (!chosenGenre) {
				throw new Error('The chosen genre was not found')
			}

			return chosenGenre.id

		} catch (e) {

			if (e instanceof Error) {
				setErrorMsg(e.message)
			}
		}

	}, [movieGenre])

	/* 	const fetchMoviesData = useCallback((movies: Movie_Results) => { // not necessary?

			// setTimeout(() => {

			// 	refetch()
			// 	setMoviesData(movies)

			// }, 250)

			// refetch()
			setMoviesData(movies)

		}, []) */

	useEffect(() => {

		setErrorMsg(null)

		try {

			if (!data) {
				throw new Error('Unable to load data')
			}

			const id = findGenreId(data.genres)

			if (id) {
				setMovieGenreId(id)
			}

		} catch (e) {

			if (e instanceof Error) {
				setErrorMsg(e.message)
			}

		}

	}, [data, findGenreId])

	useEffect(() => {

		setMoviesData(null)
		setLoadingMovies(true)
		setMovieGenre(genre as string)

		if (movies) {
			// fetchMoviesData(movies)
			setMoviesData(movies)
			setLoadingMovies(false)
		}

	}, [movies, genre])

	return (
		<>
			<div className='category-page-hero'>
				<h1>Genre: <span className='text-capitalize'>{genre}</span></h1>
			</div>

			{isError || errorMsg && !loadingMovies && <Alert variant='danger'>{errorMsg || "Something went wrong."}</Alert>}

			{/* {loadingMovies && <span className='text-light'>Loading...</span>} */}

			{isFetching && <span className='text-light'>Fetching...</span>}

			{/* {!moviesData && <span className='text-light'>Getting that data 4</span>} */}

			{/* {moviesData && loadingMovies && <span className='text-light'>Getting that data 4</span>} */}

			{/* {!isFetching && !loadingMovies && moviesData && <MovieGrid data={moviesData.results} />} */}

			{!isFetching && moviesData && <MovieGrid data={moviesData.results} />}



		</>
	)
}

export default MovieGenrePage
