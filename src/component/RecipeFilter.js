import React from 'react'

class RecipeFilter extends React.Component{
    state = {
        recipe:"",
        cuisine:"",
        course:"",
        lacto: false,//388^Lacto vegetarian
        ovo: false,// 389^Ovo vegetarian
        keto: false,//406^Ketogenic
        pesca: false,//390^Pescetarian
        vegan:false,// 386^Vegan
        vegetarian: false,//387^Lacto-ovo vegetarian
        paleo: false,//403^Paleo
        glutenFree: false,//393^Gluten-Free
        peanutFree: false,//394^Peanut-Free
        seafoodFree:false,//398^Seafood-Free
        sesameFree: false,//399^Sesame-Free
        soyFree: false,//400^Soy-Free
        dairyFree: false,//396^Dairy-Free
        eggFree: false,//397^Egg-Free
        sulfiteFree: false,//401^Sulfite-Free
        treenutFree: false,//395^Tree Nut-Free
        wheatFree: false,//392^Wheat-Free
        fetchedList:[],
        renderedCards:[]
    }


    // fetch url for just recipe
    //http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true

    // query recipes also including ingredients
    //http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true&allowedIngredient[]=garlic&allowedIngredient[]=cognac

    //query recipe based on allergies
    //http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true&allowedAllergy[]=396^Dairy-Free&allowedAllergy[]=393^Gluten-Free

    //query recipe based on diet
    //http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true&allowedDiet[]=390^Pescetarian&allowedDiet[]=388^Lacto vegetarian

    //query based on cuisine
    // http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true&allowedCuisine[]=cuisine^cuisine-american


    //query based on course
    //http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&requirePictures=true&allowedCourse[]=course^course-Appetizers

    fetchRecipeList = (baseURL) =>{
        fetch(baseURL)
        .then(resp => resp.json())
        .then(r => this.setState({fetchedList: r.matches}))
        //async issue
        .then(this.fetchSingleRecipe())
    }
    fetchSingleRecipe = () =>{
        this.state.fetchedList.map(recipe => {
            fetch(`http://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=5280a629&_app_key=7b04744f3562fbbf2a23c9f72093c89a`)
            .then(resp => resp.json())
            .then(r => this.setState({renderedCards: [...this.state.renderedCards, r]}))
            .then(this.props.filterRecipe(this.state.renderedCards))
        })

    }

    cuisineList = (type) => {
        const cuisineList = [{cuisine: "",searchTerm:""},{cuisine: "American",searchTerm:"cuisine^cuisine-american"},{cuisine: "Kid Friendly",searchTerm:"cuisine^cuisine-kid-friendly"},{cuisine: "Italian",searchTerm:"cuisine^cuisine-italian"},{cuisine: "Asian",searchTerm:"cuisine^cuisine-asian"},{cuisine: "Mexican",searchTerm:"cuisine^cuisine-mexican"},{cuisine: "Southern & Soul Food",searchTerm:"cuisine^cuisine-southern"},{cuisine: "French",searchTerm:"cuisine^cuisine-french"},{cuisine: "Southwestern",searchTerm:"cuisine^cuisine-southwestern"},{cuisine: "Barbecue",searchTerm:"cuisine^cuisine-barbecue-bbq"},{cuisine: "Indian",searchTerm:"cuisine^cuisine-indian"},{cuisine: "Chinese",searchTerm:"cuisine^cuisine-chinese"},{cuisine:"Cajun & Creole",searchTerm:"cuisine^cuisine-cajun"},{cuisine: "English",searchTerm:"cuisine^cuisine-english"},{cuisine: "Mediterranean",searchTerm:"cuisine^cuisine-mediterranean"},{cuisine: "Greek",searchTerm:"cuisine^cuisine-greek"},{cuisine: "Spanish",searchTerm:"cuisine^cuisine-spanish"},{cuisine: "German",searchTerm:"cuisine^cuisine-german"},{cuisine: "Thai",searchTerm:"cuisine^cuisine-thai"},{cuisine: "Moroccan",searchTerm:"cuisine^cuisine-moroccan"},{cuisine: "Irish",searchTerm:"cuisine^cuisine-irish"},{cuisine: "Japanese",searchTerm:"cuisine^cuisine-japanese"},{cuisine: "Cuban",searchTerm:"cuisine^cuisine-cuban"},{cuisine: "Hawaiian",searchTerm:"cuisine^cuisine-hawaiian"},{cuisine: "Swedish",searchTerm:"cuisine^cuisine-swedish"},{cuisine: "Hungarian",searchTerm:"cuisine^cuisine-hungarian"},{cuisine: "Portugese",searchTerm:"cuisine^cuisine-portuguese"}]

        const courseList = [{course: "",searchTerm:""},{course:"Main Dishes",searchTerm:"course^course-Main Dishes"}, {course:"Desserts",searchTerm:"course^course-Desserts"}, {course:"Side Dishes",searchTerm:"course^course-Side Dishes"}, {course:"Lunch",searchTerm:"course^course-Lunch"}, {course:"Appetizers",searchTerm:"course^course-Appetizers"},{course:"Salads",searchTerm:"course^course-Salads"},{course: "Breads",searchTerm:"course^course-Breads"}, {course:"Breakfast and Brunch",searchTerm:"course^course-Breakfast and Brunch"},
        {course:"Snacks",searchTerm:"course^course-Snacks"}, {course:"Soups",searchTerm:"course^course-Soups"}, {course:"Beverages",searchTerm:"course^course-Beverages"}, {course:"Condiments and Sauces",searchTerm:"course^course-Condiments and Sauces"}, {course:"Cocktails",searchTerm:"course^course-Cocktails"}]

        if(type === "cuisine"){
            return cuisineList.map((cuisine) =>
                <option value = {cuisine.searchTerm}>{cuisine.cuisine}</option>
            )
        }
        else if(type === "course"){
            return courseList.map((course) =>
                <option value = {course.searchTerm}>{course.course}</option>
            )
        }
    }


    dietRestrictions = (type) =>{
        const diet = [{diet:"Lacto-vegetarian", val: this.state.lacto, dietState:"lacto" },{diet:"Ovo-vegetarian", val: false,dietState:"ovo"},{diet:"Pescetarian", val: false, dietState:"pesca"},{diet:"Vegan", val: false, dietState: "vegan"},{diet:"Vegetarian", val: false, dietState:"vegetarian"}]

        const allergy = [{allergy:"Dairy", val: false, allergyState:"dairyFree"}, {allergy:"Egg", val: false, allergyState:"eggFree"}, {allergy:"Gluten",val: false,allergyState:"glutenFree"}, {allergy:"Peanut",val: false,allergyState:"peanutFree"}, {allergy:"Seafood",val: false,allergyState:"seafoodFree"}, {allergy:"Sesame", val: false, allergyState:"sesameFree"},{allergy:"Soy", val: false,allergyState:"soyFree"}, {allergy:"Sulfite",val: false,allergyState:"sulfiteFree"}, {allergy:"Tree Nut", val: false,allergyState:"treenutFree"}, {allergy:"Wheat", val: false,allergyState:"wheatFree"}]

        if(type === "diet"){
            return diet.map((dietOption) =>

                <div><label> {dietOption.diet}</label>
                    <input type = "checkbox" value = {dietOption.val} name = {dietOption.dietState} onChange = {this.clickHandler}/><br/></div>
            )
        }
        else if (type = "allergy"){
            return allergy.map(allergyOption =>
                <div><label> {allergyOption.allergy}</label><input type = "checkbox" value = {allergyOption.val} name = {allergyOption.allergyState} onChange = {this.clickHandler} /><br/></div>
            )
        }

    }

    handleChange = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    clickHandler = (e) =>{
        if (e.target.value === "false"){
            this.setState({
                [e.target.name]: true
            })
        }
        else if(e.target.value === "true"){
            this.setState({
                [e.target.name]: false
            })
        }
    }

    concatURL = (e) =>{
        e.preventDefault()
        let dietList = []
        let allergyList = []
        let baseURL = `http://api.yummly.com/v1/api/recipes?_app_id=5280a629&_app_key=7b04744f3562fbbf2a23c9f72093c89a&q=`

    //conditions for checkbox form
        if (this.state.lacto === true){dietList.push("&allowedDiet[]=388^Lacto+vegetarian")}
        if (this.state.ovo === true){dietList.push("&allowedDiet[]=389^Ovo+vegetarian")}
        if (this.state.keto === true){dietList.push("&allowedDiet[]=406^Ketogenic")}
        if (this.state.pesca === true){dietList.push("&allowedDiet[]=390^Pescetarian")}
        if (this.state.vegan ===true){dietList.push("&allowedDiet[]=386^Vegan")}
        if (this.state.vegetarian === true){dietList.push("&allowedDiet[]=387^Lacto-ovo+vegetarian")}
        if( this.state.paleo === true){dietList.push("&allowedDiet[]=403^Paleo")}
        if (this.state.glutenFree === true){allergyList.push("&allowedAllergy[]=393^Gluten-Free")}
        if (this.state.peanutFree === true){allergyList.push("&allowedAllergy[]=394^Peanut-Free")}
        if (this.state.seafoodFree ===true){allergyList.push("&allowedAllergy[]=398^Seafood-Free")}
        if (this.state.sesameFree === true){allergyList.push("&allowedAllergy[]=399^Sesame-Free")}
        if (this.state.soyFree === true){allergyList.push("&allowedAllergy[]=400^Soy-Free")}
        if (this.state.dairyFree === true){allergyList.push("&allowedAllergy[]=396^Dairy-Free")}
        if (this.state.eggFree === true){allergyList.push("&allowedAllergy[]=397^Egg-Free")}
        if (this.state.sulfiteFree === true){allergyList.push("&allowedAllergy[]=401^Sulfite-Free")}
        if (this.state.treenutFree === true){allergyList.push("&allowedAllergy[]=395^Tree Nut-Free")}
        if (this.state.wheatFree === true){allergyList.push("&allowedAllergy[]=392^Wheat-Free")}

        if(this.state.recipe !== ""){baseURL += this.state.recipe.split(" ").join("+")}
        if(this.state.cuisine !== ""){baseURL += ("&allowedCuisine[]="+this.state.cuisine)}
        if(this.state.course !== ""){baseURL += ("&allowedCourse[]="+this.state.course)}

        if(dietList.length > 0){
            dietList.map(condition => baseURL += condition)
        }

        if(allergyList.length > 0){
            allergyList.map(condition => baseURL += condition)
        }

        this.fetchRecipeList(baseURL)


    }

    render(){
        let something = this.state

        console.log(this.state)
        return(
            <div >
                <h1>Filter</h1>
                    <form onSubmit = {this.concatURL}>
                    <label> Recipe Name </label>
                    <input type = "text" name ="recipe" onChange = {this.handleChange} value = {this.state.recipe} />
                    <br/>
                        <label> Cuisine: </label>
                        <select onChange = {this.handleChange} name = "cuisine">
                            {this.cuisineList("cuisine")}
                        </select>
                        <br/>
                        <label> Course: </label>
                        <select onChange = {this.handleChange} name = "course">
                            {this.cuisineList("course")}
                        </select>
                        <br/>

                        <h3> Dietary Restrictions</h3>
                        {this.dietRestrictions("diet")}
                        <h3> Allergy Restrictions</h3>
                        {this.dietRestrictions("allergy")}

                        <button type = "submit"> Submit </button>
                    </form>

            </div>
        )
    }
}
export default RecipeFilter
