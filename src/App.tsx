import './assets/scss/App.scss'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from 'react-router-dom'
import ActorPage from './pages/ActorPage'
import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'
import LatestMoviesPage from './pages/LatestMoviesPage'
import MovieGenrePage from './pages/MovieGenrePage'
import MovieGenresPage from './pages/MovieGenresPage'
import MoviePage from './pages/MoviePage'
import Navigation from './pages/partials/Navigation'
import PopularMoviesPage from './pages/PopularMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'

function App() {

	return (
		<div id='App'>
			<Navigation />

			<Container className='page-body'>
				<Routes>
					<Route path='/' element={<HomePage />} />

					<Route path='/actor/:id' element={<ActorPage />} />

					<Route path='/movies/'>
						<Route path='latest-movies' element={<LatestMoviesPage />} />
						<Route path='popular-movies' element={<PopularMoviesPage />} />
						<Route path='top-movies' element={<TopMoviesPage />} />
					</Route>

					<Route path='/movies/genres/'>
						<Route path='' element={<MovieGenresPage />} />
						<Route path=':genre' element={<MovieGenrePage />} />
					</Route>

					<Route path='/movie/:id' element={<MoviePage />} />

					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

		</div>
	)
}

export default App
