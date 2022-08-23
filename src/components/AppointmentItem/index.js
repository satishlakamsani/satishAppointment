// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {title, date, isFavorite, id} = appointmentDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-container-item">
      <div className="app-item">
        <div className="app-details">
          <p className="title">{title}</p>
          <p className="date">{date}</p>
        </div>
        <button
          type="button"
          testid="star"
          className="favorite-icon-container"
          onClick={onClickFavoriteIcon}
        >
          <img src={starImgUrl} className="favorite-icon" alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
