import { getMoviesByGenre } from '../services/TMDB_API'
import { Movie_Genre, Movie_Results } from '../types/TMDB_Movie.types'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import useMovieGenres from '../hooks/useMovieGenres'
import useMoviesByGenre from '../hooks/useMoviesByGenre'

const MovieGenrePage = () => {

	const { genre } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()

	const paramsPage = searchParams.get('page')

	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [loadingMovies, setLoadingMovies] = useState(false)
	const [movieGenre, setMovieGenre] = useState('')
	const [movieGenreId, setMovieGenreId] = useState(0)
	const [moviesData, setMoviesData] = useState<Movie_Results | null>(null)

	const pageNum = Number(paramsPage)
	const [page, setPage] = useState(pageNum | 1);

	const { data } = useMovieGenres()

	const { data: movies, isError, isFetching } = useMoviesByGenre(movieGenreId, page)

	const getNewData = async (newPage: number) => {

		setMoviesData(null)
		setErrorMsg(null)
		setLoadingMovies(true)

		setSearchParams({ page: newPage.toString() })

		try {
			const newData = await getMoviesByGenre(movieGenreId, newPage)
			setMoviesData(newData)
			setPage(newPage)

			if (!newData) {
				setLoadingMovies(false)
				throw new Error('There was a problem loading in new movies')
			}
		} catch (e) {
			if (e instanceof Error) {
				setErrorMsg(e.message)
			}
		}

		setLoadingMovies(false)
	}

	const changePage = async (next: boolean) => {

		const nextPageValue = next ? page + 1 : page - 1

		getNewData(nextPageValue)
		setPage(nextPageValue)
	}

	const goToFirstPage = async () => {
		getNewData(1)
		setPage(1)
	}

	const goToLastPage = async () => {

		if (moviesData) {
			const maxPages = moviesData.total_pages < 500 ? moviesData.total_pages : 500
			getNewData(maxPages)
			setPage(maxPages)
		}
	}

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
		setPage(pageNum)

		if (movies) {
			setMoviesData(movies)
			setLoadingMovies(false)
		}

	}, [movies, genre, pageNum])

	return (
		<>
			<div className='category-page-hero'>
				<h1>Genre: <span className='text-capitalize'>{genre}</span></h1>
			</div>

			{isError || errorMsg && !loadingMovies && <Alert variant='danger'>{errorMsg || "Something went wrong."}</Alert>}

			{isError && <Alert variant='danger'>{errorMsg || "Something went wrong."}</Alert>}

			{isFetching && <span className='text-light'>Fetching...</span>}

			{!isFetching && moviesData && <MovieGrid data={moviesData.results} />}

			{moviesData && <Pagination
				page={page}
				totalPages={moviesData.total_pages}
				onChangePage={changePage}
				onGoToFirstPage={goToFirstPage}
				onGoToLastPage={goToLastPage}
			/>}

		</>
	)
}

export default MovieGenrePage
