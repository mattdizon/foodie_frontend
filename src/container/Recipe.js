import React from 'react'
import {Link} from 'react-router-dom'
class Recipe extends React.Component{
    state = {
        recipeObj: {},
        filter: false,
        ingredients:[],
        instructions:[]
    }

componentDidMount(){
    const {id} = this.props.match.params
    fetch(`http://foodz-backend.herokuapp.com/chef_recipes/${id}`)
    .then(resp => resp.json())
    .then(recipeObj => this.setState({recipeObj}))
    .then(this.renderIng)
    }
    renderIng = () => {
        this.state.recipeObj.recipe_ingredients.map(ing => this.setState({ingredients: [...this.state.ingredients, ing]}))
        this.state.recipeObj.recipe_instructions.map(inst => this.setState({instructions: [...this.state.instructions, inst]}))
    }
    showIng = () =>{
        return this.state.ingredients.map(ing => <li>{ing.name}</li>)
    }
    showInst = () =>{
        return this.state.instructions.map(inst => <li>{inst.instruction}</li>)
    }

    render(){
        console.log(this.state)
        return(
            <div className = "container">
                <div className = "mediaContainer">
                    <iframe width="60%" height="600px"
                    src={this.state.recipeObj.video} className = "carosell">
                    </iframe>
                </div>
                <div className = "contentContainer">
                    <h1>{this.state.recipeObj.recipe_name}</h1>
                    <p>Cuisine: {this.state.recipeObj.cuisine}</p>
                    <p>{this.state.recipeObj.description}</p>
                    <p>Time {this.state.recipeObj.time}</p>
                    <div className = "ingredients">
                        <ul className = "ingredientList">
                            {this.showIng()}
                        </ul>
                    </div>
                <div className = "instructions">
                    {this.showInst()}
                </div>
            </div>

            </div>

        )
    }
}
export default Recipe
