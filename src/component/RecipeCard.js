import React from 'react'
import {Link} from 'react-router-dom'
class RecipeCard extends React.Component{
    state = {
        filter: false
    }
    componentDidMount(){
        this.setState({filter: this.props.filter})
    }

    chooseRender = () =>{
        if(this.state.filter === false){

            return(
                <Link to = {`/recipes/${this.props.recipeObj.id}`}>
                <div className = "recipe-card">
                    <div className = "thumbnail">
                        <img src = {this.props.recipeObj.thumbnail}/>
                    </div>
                    <div className = "description">
                        <h1>{this.props.recipeObj.name}</h1>
                        <p>{this.props.recipeObj.cuisine}</p>
                        <p>{this.props.recipeObj.time}</p>
                        <p>{this.props.recipeObj.description}</p>
                    </div>
                </div>
                </Link>
            )
        }
        else{
            return(

                <div className = "recipe-card">
                    <div className = "thumbnail">
                    <img src = {this.props.recipeObj.images[0].hostedLargeUrl}/>
                    </div>
                    <div className = "description">
                        <h1>{this.props.recipeObj.name}</h1>
                        <p>{this.props.recipeObj.cuisine}</p>
                        <p>{this.props.recipeObj.time}</p>
                        <p>{this.props.recipeObj.description}</p>
                    </div>
                </div>

            )
        }

    }

    render(){
        console.log(this.props)
        return(
            this.chooseRender()

        )
    }
}
export default RecipeCard
