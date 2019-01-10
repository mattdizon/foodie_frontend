import React from 'react'
import {Link} from 'react-router-dom'
class RecipeCard extends React.Component{

    render(){

        return(
            <Link to = {`/recipes/${this.props.recipeObj.id}`}>
            <div className = "recipe-card">
                <div className = "thumbnail">
                </div>
                <div className = "description">
                    <h1>{this.props.recipeObj.recipe_name}</h1>
                    <p>{this.props.recipeObj.cuisine}</p>
                    <p>{this.props.recipeObj.time}</p>
                    <p>{this.props.recipeObj.description}</p>
                </div>
            </div>
            </Link>
        )
    }
}
export default RecipeCard
