import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../actions/profile'
import { Link } from 'react-router-dom'

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return (<Fragment>
        <div className="temp">
            <h1 className="large text-primary">Welcome To Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Hello {user && user.name}. Nice To Meet You!!</p>

            <div className='dash-buttons'>
                <Link to="/add-bus" className='btn btn-success'>
                    <i className="fas fa-bus" > Add Bus</i></Link>
            </div>
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete Account
                </button>
            </div>
        </div>

    </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
