import React from 'react'
class SignUp extends React.Component{
    state = {
        username: "",
        email: "",
        password: "",
        first_name:"",
        last_name:"",
    }
    handleChange = (e) => {
    e.preventDefault()
    // get some value from the event and save it to state
    // setState
    this.setState({
      [e.target.name]: e.target.value
    })
  }

    render(){
        return (
            <div className="signup-form">
                <form onSubmit={(e) => this.props.createAccount(this.state, e)} onChange = {this.handleChange}>
                    <h2>Register</h2>
                    <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6">
                                <input type="text" className="form-control"
                                 placeholder="First Name" required="required" name = "first_name"
                                  value = {this.state.first_name} >
                                 </input>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className="form-control" name = "last_name"  placeholder="Last Name" required="required"
                                value= {this.state.last_name}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Username" required="required"
                        value= {this.state.username} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Email" required="required"
                        value= {this.state.email}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" required="required"
                        value= {this.state.password} />
                    </div>
                    <div className="form-group">
                        <button type = 'submit' className="btn btn-success btn-lg btn-block">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account?</div>
            </div>


        )
    }
}
export default SignUp
