import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import logo from './logo.png';
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (

        <ul>    <li><Link to="/add-bus">
            <i className="fas fa-plus" > Add Bus</i></Link></li>


            <li><Link to="/profile"><i className="fas fa-user" >{'   '}
                    Profile</i></Link></li>
            <li><a onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt">{'   '}Logout</i></a></li>
        </ul>

    )

    const guestLinks = (

        <ul>

            <li><Link to="/">Homepage</Link> </li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>


    )

    return (

        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> GET SET FLY </Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>

    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
