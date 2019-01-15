import React from 'react'
import {Link} from 'react-router-dom'
class Recipe extends React.Component{
    state = {
        recipeObj: {},
        filter: false
    }

componentWillMount(){
    const {id} = this.props.match.params
    fetch(`http://localhost:3000/chef_recipes/${id}`)
    .then(resp => resp.json())
    .then(recipeObj => this.setState({recipeObj}))
}


    render(){
        console.log(this.state.recipeObj.video)
        return(
            <div className = "container">
                <div className = "mediaContainer">
                <iframe width="600" height="400"
                src={this.state.recipeObj.video}>s
                </iframe>
                </div>
                <div className = "ingredients">
                </div>
                <div className = "contentContainer">
                <h1>{this.state.recipeObj.recipe_name}</h1>
                <p> Difficulty: {this.state.recipeObj.difficulty}</p>
                <p>Cuisine: {this.state.recipeObj.cuisine}</p>
                <p>Time {this.state.recipeObj.time}</p>
                </div>

            </div>

        )
    }
}
export default Recipe
