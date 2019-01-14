import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button} from 'react-bootstrap'
class Nav extends React.Component{


    isUserSignedIn = () => {
        if(this.props.isUserSignIn === true){
            return(
                <nav class="navbar navbar-expand-lg navbar-default">
                    <NavLink to ="/" className="navbar-brand">Foodz</NavLink>

                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink to = "/">Home</NavLink>
                                <NavLink to ="/profile" className="nav-item nav-link">Profile</NavLink>
                                <NavLink to ="/recipes" className="nav-item nav-link">Recipes</NavLink>
                            </div>
                            <div className = "top-right-buttons">
                                <Button className="nav-item nav-link" onClick = {this.props.handleLogout}>Sign Out</Button>
                            </div>

                        </div>
            </nav>
            )
        }
        else{
            return(
                <nav class="navbar navbar-expand-lg navbar-default">
                    <NavLink to ="/" className="navbar-brand">Foodz</NavLink>

                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink to = "/">Home</NavLink>
                                <NavLink to ="/profile" className="nav-item nav-link">Profile</NavLink>
                                <NavLink to ="/recipes" className="nav-item nav-link">Recipes</NavLink>
                            </div>
                            <div className = "top-right-buttons">
                                <Button><NavLink to ="/signup" className="nav-item nav-link">Sign Up</NavLink></Button>
                                <Button><NavLink to ="/signin" className="nav-item nav-link">Sign In</NavLink></Button>
                            </div>


                        </div>
            </nav>
            )
        }
    }
    render(){
        console.log(this.props)
        return(

            this.isUserSignedIn()
        )
    }
}
export default Nav
