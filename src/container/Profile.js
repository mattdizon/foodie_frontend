import React from 'react'
import Auth from '../module/Auth'
import UserIngredient from '../component/UserIngredient'
class Profile extends React.Component{

    state = {
        userObj: {},
        ingredient: "",
        userIngredients:[]
    }
    componentDidMount(){
            fetch("http://foodz-backend.herokuapp.com/users")
            .then(resp => resp.json())
            .then(resp =>{
                let x = resp.filter(user => user.auth_token === Auth.getToken())
                this.setState({userObj:x[0]})
            })
            .then(this.fetchUserIngredients())
    }
    fetchUserIngredients = () =>{
        fetch(`http://foodz-backend.herokuapp.com/users/${this.state.userObj.id}/user_ingredients`)
        .then(resp => resp.json())
        .then(userIngredients => this.setState({userIngredients:userIngredients}))
    }

    submitHandler = (e) =>{
        e.preventDefault()
        fetch(`http://foodz-backend.herokuapp.com/users/${this.state.userObj.id}/user_ingredients`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user_ingredient:{
                    user_id: this.state.userObj.id,
                    ingredient: this.state.ingredient
                }
                })
        })
    }
    handleChange = (e) =>{
        this.setState({ingredient: e.target.value})
    }
    showIngredients = () =>{
        return this.state.userIngredients.map(ingredient => {
            return <UserIngredient ingredient = {ingredient}/>})
    }
    render(){
        console.log(this.state.userIngredients)
        return(
            <div className = "container">
            <div className = "profile-header">
                <h1>{this.state.userObj.username}</h1>
                <hr/>
                <h1>Add Ingredients to your pantry</h1>
                <form onSubmit = {this.submitHandler}>
                    <label>Ingredient</label>
                    <input type = "text"  value = {this.state.ingredient}  onChange = {this.handleChange} placeholder = "Ingredient"/>
                    <button type = "submit">Submit</button>
                </form>
                <hr/>
                <h1>Your Ingredients</h1>
                {this.showIngredients()}
            </div>
        </div>
        )
    }
}
export default Profile
