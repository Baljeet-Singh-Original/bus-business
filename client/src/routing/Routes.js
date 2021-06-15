import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import '../App.css';
import Login from '../components/Login'
import Register from '../components/Register'
import Alert from '../components/Alert'
import Dashboard from '../components/Dashboard'
// import CreateProfile from '../profile-forms/CreateProfile'
// import EditProfile from '../profile-forms/EditProfile'
// import AddExperience from '../profile-forms/AddExperience'
// import Addbuses from '../profile-forms/Addbuses'
// import Profiles from '../profiles/Profiles'
import Profile from '../components/Profile'
// import Posts from '../posts/Posts'
// import Post from '../post/Post'
// import NotFound from '../layout/NotFound'
// import About from '../layout/About'
import PrivateRoute from '../routing/PrivateRoute'
import AddBus from '../components/AddBus'

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/add-bus" component={AddBus} />
        {/* <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-buses" component={Addbuses} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>

  )
}

export default Routes