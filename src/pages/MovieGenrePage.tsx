import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import MovieGrid from '../components/MovieGrid'
import { useQuery } from '@tanstack/react-query'
import { getMovieGenres, getMoviesByGenre } from '../services/TMDB_API'
import { Movie_Genre, Movie_Results } from '../types/TMDB.types'
import useMovieGenres from '../hooks/useMovieGenres'
import useMoviesByGenre from '../hooks/useMoviesByGenre'
import useMoviesByGenreCopy from '../hooks/useMoviesByGenre-copy'


const MovieGenrePage = () => {

	const { genre } = useParams()
	const [movieGenreId, setMovieGenreId] = useState<number>(0)
	const [movieGenre, setMovieGenre] = useState<string>('')
	// const [movies, setMovies] = useState<Movie_Results | null>(null)
	const [loadingMovies, setLoadingMovies] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	// const [movieGenres, setMovieGenres] = useState<Movie_Genre[] | null>(null)

	const [moviesData, setMoviesData] = useState<Movie_Results | null>(null)

	const { data } = useMovieGenres()

	const { data: movies, isError, isLoading, refetch, isFetching } = useQuery({
		queryKey: ['movies_by_genre'],
		queryFn: () => getMoviesByGenre(movieGenreId, 1),
		enabled: !!movieGenreId
	})

	const findGenreId = useCallback((data: Movie_Genre[]) => {

		try {

			if (!data) {
				throw new Error('No genres found')
			}

			const chosenGenre = data.find((movie) => {
				return movie.name.toLowerCase().split(" ").join('-') === movieGenre
			})

			if (!chosenGenre) {
				throw new Error('The chosen genre was not found')
			}

			// setMovieGenreId(chosenGenre.id)
			return chosenGenre.id


		} catch (e) {
			setErrorMsg(e.message)
			console.log('error', e)
		}

	}, [movieGenre])

	const fetchMoviesData = useCallback((movies: Movie_Results) => {

		setTimeout(() => {
			refetch({ throwOnError: true })
			setMoviesData(movies)

			console.log('fetchmoviesdata')

		}, 500)

		// setMoviesData(movies)


	}, [refetch])

	useEffect(() => {

		console.log('fire useeffect find id')

		setLoadingMovies(true)

		try {

			if (!data) {
				throw new Error('Unable to find data')
			}

			const id = findGenreId(data.genres)
			console.log(id)
			// findGenreId(data.genres)

			if (id) {
				setMovieGenreId(id)
			}

		} catch (e) {

			console.log('error', e)

		}

		// setLoadingMovies(false)

	}, [data, findGenreId])

	useEffect(() => {

		console.log('fire set movies')
		// setLoadingMovies(true)
		setMoviesData(null)
		setMovieGenre(genre as string)

		if (movies) {

			console.log('fire refetch')
			fetchMoviesData(movies)

			// setMoviesData(movies)
			setLoadingMovies(false)
		}

	}, [movies, genre, fetchMoviesData])

	return (
		<div>
			<h1>Genre: <span className='text-capitalize'>{genre}</span></h1>

			{/* {loadingMovies && <span className='text-capitalize'>Loading...</span>} */}

			{/* {isFetching && <span className='text-capitalize'>Fetching...</span>} */}

			{/* {!isFetching && !moviesData && <span className='text-capitalize'>Getting that data</span>} */}

			{!moviesData && <span className='text-capitalize'>Getting that data 4</span>}

			{moviesData && loadingMovies && <span className='text-capitalize'>Getting that data 4</span>}


			{/* {moviesData && loadingMovies && <span className='text-capitalize'>Data 4</span>} */}


			{/* {!loadingMovies && movies && <MovieGrid data={movies.results} />} */}

			{/* {!isFetching && !loadingMovies && moviesData && <MovieGrid data={moviesData.results} />} */}

			{!isFetching && moviesData && <MovieGrid data={moviesData.results} />}



		</div>
	)
}

export default MovieGenrePage
