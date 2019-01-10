import React from 'react'
export default class SignIn extends React.Component{

    state = {
        username: '',
        password: ''
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
        return(
            <div className="login-form">
    <form onChange = {this.handleChange} onSubmit={(e) => this.props.handleLoginSubmit(this.state, e)}>
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
            <input type="text" className="form-control" name = "username"
             placeholder="Username" value = {this.state.username} required="required"/>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" name = "password"
            value = {this.state.password} placeholder="Password" required="required"/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
        </div>
        <div className="clearfix">
            <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
            <button className="pull-right">Forgot Password?</button>
        </div>
    </form>
    <p className="text-center"><button>Create an Account</button></p>
</div>
        )
    }
}
