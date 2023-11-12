import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import GoBackBtn from '../components/GoBackBtn'
import Image from 'react-bootstrap/Image'
import useActor from '../hooks/useActor'
import useActorCredits from '../hooks/useActorCredits'

const ActorPage = () => {

	const { id } = useParams()
	const navigate = useNavigate()

	const actorId = Number(id)
	const [closed, setClosed] = useState(true)

	const { data: actor, isError, isFetching } = useActor(actorId)
	const { data: movie_credits, isError: isErrorCredits, isFetching: isFetchingCredits } = useActorCredits(actorId)

	const openBio = () => {
		setClosed(!closed)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>

			{isError && <Alert variant='danger'>Something went wrong with the request.</Alert>}

			{isFetching && <p>Loading actor information...</p>}

			{isFetchingCredits && <p>Loading actor credits information...</p>}

			{actor &&
				<div className='actor-page-container'>
					<h1>{actor.name}</h1>
					<div className='actor-page-grid'>
						<h2 className='actor-info-title'>Actor Information</h2>
						<Image className='profile-img' fluid src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="picture of actor" />
						<div className='grid-box actor-info'>
							<ul>
								<li><span className='title-small'>Name:</span> {actor.name}</li>
								<li><span className='title-small'>Birthday:</span> {actor.birthday}</li>
								{actor.deathday ? <li><span className='title-small'>Deathday:</span> {actor.deathday}</li> : ''}
								<li><span className='title-small'>Also known as:</span> {actor.also_known_as}</li>
								<li><span className='title-small'>Link to to IMDb page:</span> <Link to={`https://www.imdb.com/name/${actor.imdb_id}/`} target='_blank'>{`https://www.imdb.com/name/${actor.imdb_id}`}</Link></li>
							</ul>
						</div>
						{actor.biography.length < 0 &&
							<>
							<h2 className='biography-title'>Biography</h2>
								<div className='biography'>
									<p className={closed ? 'closed' : 'open'}>
										{actor.biography}
									</p>
									<Button onClick={() => openBio()}>{closed ? 'Read more...' : 'Close'}</Button>
								</div>
							</>
							}

						{isErrorCredits && <div className='grid-box'>Unable to render movie credits</div>}

						{movie_credits && <>
							<h2 className='credits-title'>Credits</h2>
							<div className='grid-box movie-credits'>
								<h3>Movies</h3>
								<ul>
									{movie_credits.cast.map(movie =>
										<li key={movie.id}><span className='title-small'>Character: {movie.character}</span> <Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>
									)}
								</ul>
							</div>
						</>}
					</div>
				</div>
			}

			<GoBackBtn onGoBackOnePage={() => navigate(-1)} />
		</>
	)
}

export default ActorPage
