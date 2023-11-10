import { Movie } from '../types/TMDB_Movie.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
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
				<Card
					key={movie.id}
				>
					<Card.Img variant='' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
					<div className="card-info">
						<div>
							<span>Title:</span>
							{movie.title}
						</div>
						<div>
							<span>Release date:</span>
							{movie.release_date}
						</div>
						<div>
							<span>Average vote:</span>
							{movie.vote_average.toFixed(1)}
						</div>
					</div>
				</Card>
			))}
		</Row>
	)
}

export default MovieGrid
