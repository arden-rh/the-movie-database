import Button from "react-bootstrap/Button"

interface IProps {
	onGoBackOnePage: () => void
}

const GoBackBtn: React.FC<IProps> = ({ onGoBackOnePage }) => {

	return (
		<div className="go-back-btn">
			<Button onClick={onGoBackOnePage}>Go back</Button>
		</div>
	)
}

export default GoBackBtn
