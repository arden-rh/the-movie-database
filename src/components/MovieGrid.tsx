import { Movie } from '../types/TMDB_Movie.types'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

interface IProps {
	data: Movie[]
}

const MovieGrid: React.FC<IProps> = ({ data }) => {

	if (!data) {
		return <Alert>Something went wrong when trying to load the data.</Alert>
	}

	return (
		<Row xs={1} sm={3} md={4} lg={5} className='g-3 movie-grid'>
			{data.map(movie => (
				<Link to={`/movie/${movie.id}`} key={movie.id}>
					<Card
						key={movie.id}
					>
						<Card.Img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='poster image for movie' />
						<div className="card-info">
							<div>
								<span className='title-small'>Title:</span>
								{movie.title}
							</div>
							<div>
								<span className='title-small'>Release date:</span>
								{movie.release_date}
							</div>
							<div>
								<span className='title-small'>Average vote:</span>
								{movie.vote_average.toFixed(1)}
							</div>
						</div>
					</Card>
				</Link>
			))}
		</Row>
	)
}

export default MovieGrid
