import { useParams } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import useMovie from '../hooks/useMovie'

const MoviePage = () => {

	const { id } = useParams()

	const numId = Number(id)

	const { data, isError, isFetching } = useMovie(numId)


	return (
		<>

			{isError && <Alert variant='danger'>Something went wrong with the request.</Alert>}

			{isFetching && <p>Loading...</p>}

			{data &&
				<div>
					<h1>{data.title}</h1>
				</div>
			}
		</>
	)
}

export default MoviePage
