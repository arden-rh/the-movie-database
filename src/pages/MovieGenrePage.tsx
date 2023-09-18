import React, { useCallback, useEffect, useState } from 'react'
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
	// const [movieGenres, setMovieGenres] = useState<Movie_Genre[] | null>(null)

	const [movieData, setMovieData] = useState<Movie_Results | null>(null)

	const { data } = useMovieGenres()

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
			console.log('error', e)
		}

	}, [movieGenre])


	const { data: movies, isError, isLoading, refetch } = useQuery({
		queryKey: ['movies_by_genre'],
		queryFn: () => getMoviesByGenre(movieGenreId, 1),
		enabled: !!movieGenreId
	})


	useEffect(() => {

		console.log('fire useeffect')

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

		setLoadingMovies(false)

	}, [data, findGenreId])

	useEffect(() => {

		console.log('firing use effect genre')
		setLoadingMovies(true)
		setMovieGenre(genre as string)

	}, [genre])

	return (
		<div>
			<h1>Genre: <span className='text-capitalize'>{genre}</span></h1>

			{isLoading || loadingMovies && <span className='text-capitalize'>Loading...</span>}

			{!loadingMovies && movies && <MovieGrid data={movies.results} />}

		</div>
	)
}

export default MovieGenrePage
