import { useNavigate } from "react-router"
import GoBackBtn from "../components/GoBackBtn"

const NotFoundPage = () => {

	const navigate = useNavigate()

	return (
		<div className="page-container not-found-container">
			<div className='category-page-hero'>
				<h1>404: Not Found</h1>
			</div>

			<div>
				<GoBackBtn onGoBackOnePage={() => navigate('/')} />
			</div>

		</div>
	)
}

export default NotFoundPage
