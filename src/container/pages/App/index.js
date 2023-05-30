
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Register from '../Register';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Header from '../../../component/moleculs/Header';
import { store } from '../../../config/redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group' 



function App() {
  return (
   <Provider store={store}>
      <Router>
          <div className="App">
              <Header />
              <TransitionGroup>
                <CSSTransition classNames="page" timeout={300}>
                    <Switch>
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Redirect to="/login" />
                  </Switch>
                  </CSSTransition>
              </TransitionGroup>
          </div>
      </Router>
   </Provider>
  );
}

export default App;
