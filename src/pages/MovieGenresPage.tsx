import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import useMovieGenres from '../hooks/useMovieGenres'

const MovieGenresPage = () => {

	const { data } = useMovieGenres()

	return (
		<>
			<div className='category-page-hero'>
				<h1>Movie Genres</h1>
			</div>
			<Row xs={1} sm={3} md={4} lg={5} className='g-3 genre-grid'>
				{data && data.genres.map(genre =>
					<Link key={genre.id} to={`${genre.name.toLowerCase().split(" ").join('-')}?page=1`}>
						{genre.name}
					</Link>
				)}
			</Row>
		</>
	)
}

export default MovieGenresPage
