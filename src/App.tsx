import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Admin from "./components/Admin";
import Admin2 from "./components/Admin2";
import Manager from "./components/Manager";
import Customer from "./components/Customer";
import Main from "./components/Main";
import Header from "./components/Header";
import LoginProtectedRoute from "./LoginProtectedRoute";
import { useSelector } from 'react-redux'
import { StateType } from "./redux/store";

function App() {

  const isAuth = useSelector((state: StateType) => state.user.isAuth);

  return (
    <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
        {/* <LoginProtectedRoute path='/signin' isAuth={isAuth} component={Signin} exact={true}/>
        <LoginProtectedRoute path='/signup' isAuth={isAuth} component={Signup} exact={true}/> */}
          <Route exact path="/admin">
            <Header />
            <Admin2 />
          </Route>
          <Route exact path="/manager">
            <Header />
            <Manager />
          </Route>
          <Route exact path="/customer">
            <Header />
            <Customer />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
