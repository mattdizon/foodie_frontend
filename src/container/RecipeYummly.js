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
            return (<p> For the recipe please visit <a href = {this.state.recipeObj.source.sourceRecipeUrl}> {this.state.recipeObj.source.sourceRecipeUrl}</a></p> )
        }
    }


    render(){
        console.log(this.state)
        return(
            <div className = "container">
                <div className = "mediaContainer">
                <img src = {this.state.thumbnail} className = "media"/>
                </div>

                <div className = "contentContainer">
                <h1>{this.state.recipeObj.name}</h1>
                {this.showURL()}
                <h4>Time {this.state.recipeObj.totalTime}</h4>
                <h5>Number of servings: {this.state.recipeObj.yield}</h5>

                <div className = "ingredients">
                {this.showIng()}
                </div>


                </div>

            </div>
        )
    }
}
export default RecipeYummly
