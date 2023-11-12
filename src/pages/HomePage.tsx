import { Link } from "react-router-dom"
import Image from "react-bootstrap/Image"
import Row from 'react-bootstrap/Row'
import useLatestMovies from "../hooks/useLatestMovies"

const HomePage = () => {

	const { data: movies, isError, isFetching } = useLatestMovies(1)

	return (
		<div className="home-page">
			<div className='category-page-hero'>
				<h1>The Movie Database</h1>
			</div>

			{isError && <span>Something went wrong with the request</span>}

			{isFetching && <span>Loading...</span>}

			{movies &&
				<div className="home-page-grid">
					<Link className="link-cover-photo" to={`movie/${movies.results[0].id}`}>
						<Image className='cover-img' fluid src={`https://image.tmdb.org/t/p/w1280/${movies.results[0].backdrop_path}`} alt="promo image for movie" />
					</Link>
					<div className="hero-box">
						<span className="title-small">Now Playing</span>
						<Link className="link-first-movie" to={`movie/${movies.results[0].id}`}><h2>{movies.results[0].title}</h2></Link>
					</div>
					<Row xs={1} sm={2} md={3} lg={5} className='g-3'>
							<Link to={`movies/latest-movies`}>Latest Movies</Link>
							<Link to={`movies/popular-movies`}>Popular Movies</Link>
							<Link to={`movies/top-movies`}>Top Rated Movies</Link>
							<Link to={`movies/genres`}>All Genres</Link>
					</Row>
				</div>
			}
		</div>
	)
}

export default HomePage
