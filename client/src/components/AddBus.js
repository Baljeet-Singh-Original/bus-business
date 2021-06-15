import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addBus, addBusData } from '../actions/profile'

const AddBus = ({ addBus, addBusData, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    stops: ''
  })

  // const [toDateDisabled, toggleDisabled] = useState(false)

  const { name, company, stops } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <div className="temp">
        <h1 className="large text-primary">Add Your Bus</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add Your Bus Data.
        </p>
        <small>All fields are required.</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addBus(formData, history);
            addBusData(formData, history);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Bus Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Travel Agency Name"
              name="company"
              value={company}
              onChange={onChange}
              required
            />
            <div className="form-group">
              <input
                type="text"
                placeholder="Add Bus Stops"
                name="stops"
                value={stops}
                onChange={onChange}
              />
              <small className="form-text">
                Please use comma separated values (eg. Delhi, Rajasthan, Himachal Pradesh, Lucknow)
              </small>
            </div>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
}

AddBus.propTypes = {
  addBus: PropTypes.func.isRequired
}

export default connect(null, { addBus, addBusData })(withRouter(AddBus))
