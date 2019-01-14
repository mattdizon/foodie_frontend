import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider} from 'react-redux'
import { Route, withRouter } from "react-router-dom";
import store from './store'

import Navi from './component/Nav'
import SignUp from './component/SignUp'
import SignIn from './component/SignIn'
import Profile from './container/Profile'
import Home from './container/Home'
import Auth from './module/Auth'
import RecipeForm from './container/RecipeForm'
import Recipes from './container/Recipes'
import Recipe from './container/Recipe'


class App extends Component {
    state = {
        auth: Auth.isUserAuthenticated(),
        friendsList:[]
    }

    createAccount = (user, e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user:{
                    first_name:user.first_name,
                    last_name:user.last_name,
                    username:user.username,
                    email:user.email,
                    password:user.password,
                    chef: false
                }

            })
        })
        .then(res => res.json())
        .then(res => {
            Auth.authenticateToken(res.token);
            Auth.storeUserInfo(res.user.username, res.user.id);
            this.setState({
                auth: Auth.isUserAuthenticated(),

            })



        })
        .catch(err =>console.log(err))
        this.props.history.push("/");

    }

        handleLoginSubmit = (data,e) =>{
            e.preventDefault();
            fetch('http://localhost:3000/login',{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res =>{
                Auth.authenticateToken(res.token);
                Auth.storeUserInfo(res.user.username, res.user.id);
                this.setState({
                    auth: Auth.isUserAuthenticated(),
                })
             })
             .catch(err => console.log(err))
             this.props.history.push("/");
        }
        handleLogout = () => {
            fetch('http://localhost:3000/logout',{
                method: "DELETE",
                headers: {
                    token: Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`,
                }
            })
            .then(res => {
                Auth.deauthenticateToken()
                Auth.removeUserObj()
                this.setState({
                    auth: Auth.isUserAuthenticated(),
                    userObj: {}
                })
            }).catch(err => console.log(err))

        }



  render() {
      console.log(this.state)
    return (
    //provider takes the store
    <Provider store = {store}>
          <div className="App">
          <Navi isUserSignIn = {this.state.auth} handleLogout = {this.handleLogout}/>
            <Route exact path = "/" render = {() => <Home />} />
            <Route path = "/signup" render = {() => <SignUp createAccount = {this.createAccount}/>}/>
            <Route path = "/signin" render = {() => <SignIn handleLoginSubmit = {this.handleLoginSubmit}/>}/ >
            <Route path = "/profile" render = {() => <Profile />}/ >
            <Route exact path = "/create-recipe" render = {() => <RecipeForm/>} />
            <Route exact path = "/recipes" render = {() => <Recipes/>} />
            <Route path='/recipes/:id' exact component={Recipe}/>
          </div>
      </Provider>
    );
  }
}


export default withRouter(App);
