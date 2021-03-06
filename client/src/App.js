import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import decode from 'jwt-decode';
import store from './store/store';
import FourZeroFour from './components/404/FourZeroFour';
import PrivateRoute from './components/common/PrivateRoute';
import {setCurrentUser,logout} from './actions/userActions';
import setAuthToken from './utils/fetcher';
import NewLogin from './components/login/NewLogin';
import Layout from './components/layout/Layout';
import NewDashboard from './components/dashboard/NewDashboard';

if(localStorage.token){
  setAuthToken(localStorage.token);

  const decoded=decode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime= Date.now() / 1000;


  if(decoded.exp < currentTime){

    store.dispatch(logout());

    
    window.location.href='/login';

  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Layout>
        <Switch>
        <PrivateRoute exact path="/" component={NewDashboard}/>
        <Route exact path="/login" component={NewLogin}/>
        <Route component={FourZeroFour}/>
        </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
