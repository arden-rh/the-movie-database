import { Movie } from '../types/TMDB.types'
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
		<Row xs={1} sm={3} md={3} lg={4} className='g-3 movie-grid'>
			{data.map(movie => (
				<Card
					bg='dark'
					className='m-2'
					key={movie.id}
					text='light'
				>
					<Card.Img variant='' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
					<Card.ImgOverlay>
						<Card.Title>{movie.title}</Card.Title>
						{/* <Card.Text>
							{movie.overview}
						</Card.Text> */}
						{/* <Button variant="primary">Go somewhere</Button> */}
					</Card.ImgOverlay>
					{/* <Card.ImgOverlay >{movie.vote_average}</Card.ImgOverlay>
					<Card.Body>
						<Card.Title>{movie.title}</Card.Title>
						<Card.Text>
							{movie.overview}
						</Card.Text>
						<Button variant="primary">Go somewhere</Button>
					</Card.Body> */}
					<ListGroup className="list-group-flush">
						<ListGroup.Item>{movie.title}</ListGroup.Item>
						<ListGroup.Item>Release date: {movie.release_date}</ListGroup.Item>
					</ListGroup>
				</Card>
			))}
		</Row>
	)
}

export default MovieGrid
