import React from 'react'
import {Link} from 'react-router-dom'

class RecipeYummly extends React.Component{
    state = {
        recipeObj: {},
        ingredients:[],
        filter: false,
        thumbnail: ""
    }

    componentWillMount(){
        const {id} = this.props.match.params
        fetch(`http://api.yummly.com/v1/api/recipe/${id}?_app_id=5280a629&_app_key=7b04744f3562fbbf2a23c9f72093c89a`)
        .then(resp => resp.json())
        .then(recipeObj => this.setState({recipeObj:recipeObj}))
        .then(this.renderIng)

    }
    renderIng = () => {
        if(this.state.recipeObj.ingredientLines !== undefined){
            this.state.recipeObj.ingredientLines.map(ing => this.setState({ingredients: [...this.state.ingredients, ing]}))
            this.setState({thumbnail:this.state.recipeObj.images[0].hostedLargeUrl})
        }

    }
    showIng = () => {
        return this.state.ingredients.map(ing => <p>{ing}</p>)
    }
    showURL = () =>{
        if(this.state.recipeObj.source !== undefined){
            return (<p> Please visit {this.state.recipeObj.source.sourceRecipeUrl} for the recipe</p> )
        }
    }


    render(){

        return(
            <div className = "container">
                <div className = "mediaContainer">
                <img src = {this.state.thumbnail} className = "media"/>
                </div>

                <div className = "contentContainer">
                <h1>{this.state.recipeObj.name}</h1>
                <h4>Time {this.state.recipeObj.totalTime}</h4>
                {this.showURL()}
                <div className = "ingredients">
                {this.showIng()}
                </div>


                </div>

            </div>
        )
    }
}
export default RecipeYummly
