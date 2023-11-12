import { useParams } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import useMovie from '../hooks/useMovie'
import useMovieCredits from '../hooks/useMovieCredits'
import { Link } from 'react-router-dom'

const MoviePage = () => {

	const { id } = useParams()

	const movieId = Number(id)

	const { data: movie, isError, isFetching } = useMovie(movieId)
	const { data: movie_credits, isError: isErrorCredits, isFetching: isFetchingCredits } = useMovieCredits(movieId)


	return (
		<>

			{isError && <Alert variant='danger'>Something went wrong with the request.</Alert>}

			{isFetching && <p>Loading movie information...</p>}

			{isFetchingCredits && <p>Loading movie credits information...</p>}

			{movie &&
				<div className='movie-page-container'>
					<h1>{movie.title}</h1>
					<Image className='cover-img' fluid src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt="promo image for movie" />
					<div className='movie-page-grid'>
						<h2 className='movie-info-title'>Movie Information</h2>
						<div className='grid-box movie-info'>
							<ul>
								<li><span className='title-small'>Title:</span> {movie.title}</li>
								<li><span className='title-small'>Runtime:</span> {movie.runtime} min</li>
								<li><span className='title-small'>Release Date:</span> {movie.release_date}</li>
								<li><span className='title-small'>Vote average:</span> {movie.vote_average.toFixed(1)}</li>
								<li><span className='title-small'>Tagline:</span> {movie.tagline}</li>
							</ul>
						</div>
						<Image className='poster-img' fluid src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster for movie" />
						<h2 className='overview-title'>Overview</h2>
						<div className='overview'>
							<p>
								{movie.overview}
							</p>
						</div>
						{movie_credits && <>
							<h2 className='credits-title'>Credits</h2>
							{/*
							<div className='grid-box crew'>
								<ul>
									{movie_credits.cast.find(crew =>
										<li>Director: {crew.job === 'Director'}</li>
									)}
								</ul>
							</div>
							*/}

							<div className='grid-box cast'>
								<h3>Characters</h3>
								<ul>
									{movie_credits.cast.map(actor =>
										<li><span className='title-small'>{actor.character}</span> <Link to={`/actor/${actor.id}`}>{actor.name}</Link></li>
									)}
								</ul>
							</div>
						</>}
					</div>
				</div>
			}
		</>
	)
}

export default MoviePage
