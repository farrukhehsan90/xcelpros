import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import decode from 'jwt-decode';
import store from './store/store';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import FourZeroFour from './components/404/FourZeroFour';
import PrivateRoute from './components/common/PrivateRoute';
import {setCurrentUser,logout} from './actions/userActions';
import setAuthToken from './utils/fetcher';

if(localStorage.token){
  console.log('localStorage.token',localStorage.token);
  setAuthToken(localStorage.token);

  const decoded=decode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime= Date.now() / 1000;

  console.log(currentTime);
  console.log(decoded.exp);

  if(decoded.exp < currentTime){

    store.dispatch(logout());

    
    window.location.href='/login';

  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <PrivateRoute exact path="/" component={Dashboard}/>
        <Route exact path="/login" component={Login}/>
        <Route component={FourZeroFour}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
