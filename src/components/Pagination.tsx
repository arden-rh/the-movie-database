import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface IProps {
	page: number
	totalPages: number
	onChangePage: (next: boolean) => void
	onGoToFirstPage: () => void
	onGoToLastPage: () => void
}

const Pagination: React.FC<IProps> = ({ onChangePage, onGoToFirstPage, onGoToLastPage, page, totalPages }) => {

	return (
		<div className="pagination">
			<div className="first-page">
				<Button
					disabled={page <= 1}
					onClick={() => onGoToFirstPage()}
				>1</Button>
			</div>
			<div className="prev">
				<Button
					disabled={page <= 1}
					onClick={() => onChangePage(false)}
				><FontAwesomeIcon icon={faArrowLeft} /></Button>
			</div>
			<div className="page">
				{page} / {totalPages < 500 ? totalPages : 500}
			</div>
			<div className="next">
				<Button
					disabled={page >= 500}
					onClick={() => onChangePage(true)}
				><FontAwesomeIcon icon={faArrowRight} /></Button>
			</div>
			<div className="last-page">
				<Button
					disabled={page >= 500}
					onClick={() => onGoToLastPage()}
				>{totalPages < 500 ? totalPages : 500}</Button>
			</div>
		</div>
	)
}

export default Pagination
