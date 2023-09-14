import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import MovieGrid from '../components/MovieGrid'
import { useQuery } from '@tanstack/react-query'
import { getMoviesByGenre } from '../services/TMDB_API'
import { Movie_Genre, Movie_Results } from '../types/TMDB.types'
import useMovieGenres from '../hooks/useMovieGenres'


const MovieGenrePage = () => {

	const { genre } = useParams()
	const [movieGenre, setMovieGenre] = useState<string>('')
	const [movieGenres, setMovieGenres] = useState<Movie_Genre[] | null>(null)

	const [movieData, setMovieData] = useState<Movie_Results | null>(null)

	const useMoviesByGenre = (genre: number, page: number) => {
		return useQuery(['movies_by_genre'], () => getMoviesByGenre(genre, page))
	}

	const { data } = useMovieGenres()

	if (!data) {
		return <p>No genres found</p>
	}

	setMovieGenres(data?.genres)

	const chosenGenre = movieGenres?.find( movieGenre => {
		movieGenre.name === genre
	})

	// console.log(movieGenres!.genres)

	// if (!chosenGenre) {
	// 	return
	// }

	const { data: movies } = useMoviesByGenre(chosenGenre?.id, 1)


	return (
		<div>
			<h1>Genre: <span className='text-capitalize'>{genre}</span></h1>

			{/* {data && <MovieGrid data={data.results} />} */}

		</div>
	)
}

export default MovieGenrePage
