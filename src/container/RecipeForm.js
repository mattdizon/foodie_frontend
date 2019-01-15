import React from 'react'
import IngredientForm from '../component/IngredientForm'
class RecipeForm extends React.Component{
    state = {
        recipeName: "",
        recipeDifficulty:"",
        recipeCuisine:"",
        recipeTime:"",
        recipeDescription:"",
        thumbnail:"",
        recipeIngredients:[{ingredient:""}],
        recipeInstructions:[{instruction:""}],
        recipeImages:[{image:""}],
        recipeVideo: ""
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
                    description: this.state.recipeDescription,
                    thumbnail:this.state.thumbnail,
                    video: this.state.recipeVideo
                }
                })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.addIngredientDB(resp.id)
            this.addInstructionDB(resp.id)
            this.addImageDB(resp.id)


        })
    }
    addIngredientDB = (id) => {
        this.state.recipeIngredients.map(ing => {
            fetch(`http://localhost:3000/users/1/chef_recipes/${id}/recipe_ingredients`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    name: ing.ingredient,
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
    addImageDB = (id) => {
        this.state.recipeImages.map(image => {
            fetch(`http://localhost:3000/users/1/chef_recipes/${id}/images`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    url: image.image,
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
        handleImageNameChange = (idx) => (evt) => {
            const newImages = this.state.recipeImages.map((image, sidx) => {
              if (idx !== sidx) return image;
              return { ...image, image: evt.target.value };
            });

            this.setState({ recipeImages: newImages });
          }
          handleAddImage = () => {
              this.setState({
                  recipeImages: this.state.recipeImages.concat([{ image: '' }])
              });
          }
          handleRemoveImage = (idx) => () => {
              this.setState({
                  recipeImages: this.state.recipeImages.filter((s, sidx) => idx !== sidx)

              });

          }

    render(){
        console.log(this.state)
        return (
            <div className = "container">
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
                <label>Thumbnail</label>
                <textarea value = {this.state.thumbnail} name = "thumbnail"/>
                <br/>
                <label>Video</label>
                <textarea value = {this.state.recipeVideo} name = "recipeVideo"/>
                <br/>

                <label>Additional Images</label>
                {this.state.recipeImages.map((image, idx) => (
                    <div className = "ingredient">
                        <input type = "text" value = {image.image}
                        onChange = {this.handleImageNameChange(idx)}
                        />
                        <button onClick = {this.handleRemoveImage(idx)}
                        className = "small">-</button>
                    </div>
                ))}




                <button type = "button" onClick = {this.handleAddIngredient}> Add Ing </button>

                <button type = "button" onClick = {this.handleAddInstruction}> Add Step </button>
                <button type = "button" onClick = {this.handleAddImage}> Add Image </button>

                <button type = "submit"> Submit </button>
                </form>
            </div>
        )
    }
}
export default RecipeForm
