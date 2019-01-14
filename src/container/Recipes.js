import React from 'react'
import RecipeFilter from '../component/RecipeFilter'
import RecipeCard from '../component/RecipeCard'

class Recipes extends  React.Component{

    state = {
        recipeList: [],
        filter: false
    }
    componentDidMount(){
        fetch(`http://localhost:3000/chef_recipes`)
        .then(resp => resp.json())
        .then(recipeList => this.setState({recipeList}))
    }
    renderRecipeCard = () =>{
        return this.state.recipeList.map(recipe => <RecipeCard recipeObj = {recipe} filter = {this.state.filter}/>)
    }
    filterRecipe = (recipes) =>{
        this.setState({recipeList:recipes,
        filter:true})
    }

    render() {
        console.log(this.state)
        return (
            <div className = "container">
                <h1>Recipes</h1>
                <div className = "recipesContainer">
                <div className = "recipe-filter-menu">
                    <RecipeFilter filterRecipe = {this.filterRecipe}/>
                </div>
                    <div className = "allRecipeCards">
                        {this.renderRecipeCard()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Recipes
