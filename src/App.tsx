import './assets/scss/App.scss'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'
import LatestMoviesPage from './pages/LatestMoviesPage'
import Navigation from './components/Navigation'
import PopularMoviesPage from './pages/PopularMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'

function App() {

	return (
		<div id="App">
			<Navigation />

			<Container>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/movies/'>
						<Route path="latest-movies" element={<LatestMoviesPage />} />
						<Route path="popular-movies" element={<PopularMoviesPage />} />
						<Route path="top-movies" element={<TopMoviesPage />} />
					</Route>


					<Route path='/movies/genres/'>
						<Route path='' element={<HomePage />} />
						<Route path='action' element={<LatestMoviesPage />} />
						<Route path='adventure' element={<HomePage />} />
						<Route path='animation' element={<HomePage />} />
						<Route path='comedy' element={<HomePage />} />
						<Route path='crime' element={<HomePage />} />
						<Route path='documentary' element={<HomePage />} />
						<Route path='drama' element={<HomePage />} />
						<Route path='family' element={<HomePage />} />
						<Route path='fantasy' element={<HomePage />} />
						<Route path='history' element={<HomePage />} />
						<Route path='horror' element={<HomePage />} />
						<Route path='music' element={<HomePage />} />
						<Route path='mystery' element={<HomePage />} />
						<Route path='romance' element={<HomePage />} />
						<Route path='science-fiction' element={<HomePage />} />
						<Route path='tv-movie' element={<HomePage />} />
						<Route path='thriller' element={<HomePage />} />
						<Route path='war' element={<HomePage />} />
						<Route path='western' element={<HomePage />} />
					</Route>
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

		</div>
	)
}

export default App
