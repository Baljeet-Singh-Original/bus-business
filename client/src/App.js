import './App.css';
import React, { Fragment, useEffect } from 'react';
import './components/Navbar'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from './components/Navbar';
import Landing from './components/Landing'
import Routes from './routing/Routes'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

// redux

import { Provider } from 'react-redux';
import store from './store';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <div className="App"> */}
          <Navbar />

          <Switch>
            <Route exact path="/" component={Landing} />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> */}
            <Route component={Routes} />
          </Switch>

          {/* </div> */}
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
