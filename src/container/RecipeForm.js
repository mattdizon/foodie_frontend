import React from 'react'
import IngredientForm from '../component/IngredientForm'
class RecipeForm extends React.Component{
    state = {
        recipeName: "",
        recipeDifficulty:"",
        recipeCuisine:"",
        recipeTime:"",
        recipeDescription:"",
        recipeIngredients:[{ingredient:""}],
        recipeInstructions:[{instruction:""}]
    }
    formHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitHandler = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3000/users/1/chef_recipes`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user_ingredient:{
                    user_id: 1,
                    recipe_name: this.state.recipeName,
                    difficulty: this.state.recipeDifficulty,
                    cuisine: this.state.recipeCuisine,
                    time: this.state.recipeTime,
                    description: this.state.recipeDescription
                }
                })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.addIngredientDB(resp.id)
            this.addInstructionDB(resp.id)
        })
    }
    addIngredientDB = (id) => {
        this.state.recipeIngredients.map(ing => {
            fetch(`http://localhost:3000/users/1/chef_recipes/${id}/recipe_ingredients`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    ingredient: ing.ingredient,
                    chef_recipe_id: id
                })
            })
        })

    }
    addInstructionDB = (id) => {
        this.state.recipeInstructions.map(step => {
            fetch(`http://localhost:3000/users/1/chef_recipes/${id}/recipe_instructions`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    instruction: step.instruction,
                    chef_recipe_id: id
                })
            })
        })

    }
    handleIngredientNameChange = (idx) => (evt) => {
        const newIngredients = this.state.recipeIngredients.map((ingredient, sidx) => {
          if (idx !== sidx) return ingredient;
          return { ...ingredient, ingredient: evt.target.value };
        });

        this.setState({ recipeIngredients: newIngredients });
      }
      handleAddIngredient = () => {
          this.setState({
              recipeIngredients: this.state.recipeIngredients.concat([{ ingredient: '' }])
          });
      }
      handleRemoveIngredient = (idx) => () => {
          this.setState({
              recipeIngredients: this.state.recipeIngredients.filter((s, sidx) => idx !== sidx)

          });

      }

      handleInstructionNameChange = (idx) => (evt) => {
          const newIngredients = this.state.recipeInstructions.map((instruction, sidx) => {
            if (idx !== sidx) return instruction;
            return { ...instruction, instruction: evt.target.value };
          });

          this.setState({ recipeInstructions: newIngredients });
        }
        handleAddInstruction = () => {
            this.setState({
                recipeInstructions: this.state.recipeInstructions.concat([{ instruction: '' }])
            });
        }
        handleRemoveInstruction = (idx) => () => {
            this.setState({
                recipeInstructions: this.state.recipeInstructions.filter((s, sidx) => idx !== sidx)

            });

        }
    render(){
        return (
            <div>
                <h1>New Recipe Form </h1>
                <form onSubmit = {this.submitHandler} onChange = {this.formHandler}>
                <label>Recipe Name</label>
                <input type = "text" value = {this.state.recipeName} name ="recipeName"  />
                <br/>
                <label>Difficulty</label>
                <input type = "text" value = {this.state.recipeDifficulty} name = "recipeDifficulty" />
                <br/>
                <label>Cuisine</label>
                <input type = "text" value = {this.state.recipeCuisine} name = "recipeCuisine"/>
                <br/>
                <label>Time</label>
                <input type = "text" value = {this.state.recipeTime} name = "recipeTime"/>
                <br/>
                <label>Description</label>
                <textarea value = {this.state.recipeDescription} name = "recipeDescription"/>
                <br/>
                <label>Ingredients</label>
                {this.state.recipeIngredients.map((ingredient, idx) => (
                    <div className = "ingredient">
                        <input type = "text" value = {ingredient.name}
                        onChange = {this.handleIngredientNameChange(idx)}
                        />
                        <button onClick = {this.handleRemoveIngredient(idx)}
                        className = "small">-</button>
                    </div>
                ))}




                <label>Instructions</label>
                {this.state.recipeInstructions.map((instruction, idx) => (
                    <div className = "ingredient">
                        <input type = "text" value = {instruction.name}
                        onChange = {this.handleInstructionNameChange(idx)}
                        />
                        <button onClick = {this.handleRemoveInstruction(idx)}
                        className = "small">-</button>
                    </div>
                ))}

                <button type = "button" onClick = {this.handleAddIngredient}> Add Ing </button>
                <button type = "button" onClick = {this.handleAddInstruction}> Add Step </button>
                <button type = "submit"> Submit </button>
                </form>
            </div>
        )
    }
}
export default RecipeForm
