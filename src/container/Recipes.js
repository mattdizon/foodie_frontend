import React from 'react'
import RecipeFilter from '../component/RecipeFilter'
import RecipeCard from '../component/RecipeCard'

class Recipes extends  React.Component{

    state = {
        recipeList: []
    }
    componentDidMount(){
        fetch(`http://localhost:3000/chef_recipes`)
        .then(resp => resp.json())
        .then(recipeList => this.setState({recipeList}))
    }
    renderRecipeCard = () =>{
        return this.state.recipeList.map(recipe => <RecipeCard recipeObj = {recipe}/>)
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Recipes</h1>
                <div className = "recipesContainer">
                    <RecipeFilter/>
                    <div className = "allRecipeCards">
                        {this.renderRecipeCard()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Recipes
