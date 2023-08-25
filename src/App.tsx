import './assets/scss/App.scss'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'

function App() {

	return (
		<div id="App">
			{/* <Navigation /> */}

			<Container>
				<Routes>
					<Route path="/" element={<HomePage />} />

					{/* <Route path='/todos'>
						<Route path="" element={<TodosPage />} />
					</Route> */}
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

		</div>
	)
}

export default App
