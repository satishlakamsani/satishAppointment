// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    date: '',
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, date} = this.state
    const formatedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      date: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-list">
            <div className="appointment-details">
              <form
                className="appointment-form-container"
                onSubmit={this.onAddAppointment}
              >
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  className="title-input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onChangeDate}
                  className="title-input"
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image1"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-lists">
              {filterAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsFavorite={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
