import React from 'react'

class RecipeFilter extends React.Component{
    state = {
        name: "",
        cuisine:"",
        course:"",
        nutAllergy: false,
        eggAllergy: false,
        dairyAllergy: false,
        vegan: false,
        glutenFree:false,
        fetchedList: []
    }
    fetchRecipeList = (e) =>{
        e.preventDefault()
        fetch(`http://api.yummly.com/v1/api/recipes?_app_id=5280a629&_app_key=7b04744f3562fbbf2a23c9f72093c89a&q=onion+soup`)
        .then(resp => resp.json())
        .then(r => this.setState({fetchedList: r.matches}))
        .then(this.state.fetchedList.map(recipe => {
            this.fetchSingleRecipe(recipe)
        }))

    }
    fetchSingleRecipe = (recipe) =>{
        fetch(`http://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=5280a629&_app_key=7b04744f3562fbbf2a23c9f72093c89a`)
        .then(resp => resp.json())
        .then(r => console.log(r))

    }
    render(){

        return(
            <div className = "recipe-filter-menu">
                <h1>Filter</h1>
                    <form onSubmit = {this.fetchRecipeList}>
                    <label> Recipe Name </label>
                    <input type = "text"/>
                    <br/>
                        <label> Cuisine: </label>
                        <input type = "text"/>
                        <br/>
                        <label> Course: </label>
                        <input type = "text"/>
                        <br/>
                        <label> Ingredients I have: </label>
                        <input type = "checkbox"/>
                        <br/>
                        <label> Nut Allergy</label>
                        <input type = "checkbox"/>
                        <br/>
                        <label> Egg Allergy </label>
                        <input type = "checkbox"/>
                        <br/>
                        <label> Dairy Allergy </label>
                        <input type = "checkbox"/>
                        <br/>
                        <label> Vegan </label>
                        <input type = "checkbox"/>
                        <br/>

                        <button type = "submit"> Submit </button>
                    </form>

            </div>
        )
    }
}
export default RecipeFilter
