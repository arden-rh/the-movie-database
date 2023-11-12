import { NavLink, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import useMovieGenres from '../../hooks/useMovieGenres'

const Navigation = () => {

	const {
		data
	} = useMovieGenres()

	return (
		<Navbar expand='lg'>
			<Container>
				<Navbar.Brand as={Link} to='/'>TMDB <span>📽️</span></Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<Nav.Link as={NavLink} to='/movies/latest-movies'>Latest Movies</Nav.Link>
						<Nav.Link as={NavLink} to='/movies/popular-movies'>Popular Movies</Nav.Link>
						<Nav.Link as={NavLink} to='/movies/top-movies'>Top Rated Movies</Nav.Link>
						<NavDropdown
							title="Genres"
							id="basic-nav-dropdown"
							drop='down'
							align={{ md: 'end' }}
						>
							<NavDropdown.Item className='title-small' as={NavLink} to='/movies/genres/'>All Genres</NavDropdown.Item>
							{data && data.genres.map(genre =>
								<NavDropdown.Item className='title-small' as={NavLink} key={genre.id} to={`movies/genres/${genre.name.toLowerCase().split(" ").join('-')}?page=1`}>
									{genre.name}
								</NavDropdown.Item>)
							}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
