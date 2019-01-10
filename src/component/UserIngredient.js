import React from 'react'

class UserIngredient extends React.Component{
    render(){
        return(
            <h1>{this.props.ingredient.ingredient}</h1>
        )
    }
}
export default UserIngredient
