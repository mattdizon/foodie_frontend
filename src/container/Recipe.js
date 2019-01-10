import React from 'react'
import {Link} from 'react-router-dom'
class Recipe extends React.Component{
    state = {
        recipeObj: {}
    }

componentDidMount(){
    const {id} = this.props.match.params
    fetch(`http://localhost:3000/chef_recipes/${id}`)
    .then(resp => resp.json())
    .then(recipeObj => this.setState({recipeObj:recipeObj}))

}

    render(){
        return(
            <div>
                <h1>{this.state.recipeObj.recipe_name}</h1>
                <p> Difficulty: {this.state.recipeObj.difficulty}</p>
                <p>Cuisine: {this.state.recipeObj.cuisine}</p>
                <p>Time {this.state.recipeObj.time}</p>
            
            </div>

        )
    }
}
export default Recipe
