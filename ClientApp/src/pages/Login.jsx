import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../store/actions/user.actions'

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }


     onSubmit= () => {
         const {username, password} = this.state;
         //service for check does user exist
         console.log(username);
         console.log(password);
         this.props.login(username,password);
     }

    render(){
        const {username,password} = this.state;
        return(
            <div className="container border-bottom shadow mt-3" style={{"width":500}}>
                <form >
                    <div className="form-group">
                        <label >Name</label>
                        <input onChange={this.onChange} value={username} className="form-control" name="username" placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.onChange} type="password" value={password} className="form-control" name="password" placeholder="Enter password"/>
                    </div>
                </form>
                <div className=" text-center mb-3">
                    <button onClick={this.onSubmit}  className="btn btn-primary">Login</button>
                </div>
                {
                this.props.loginSuccess===false?
                <div class="alert alert-danger" role="alert">
                    Something went wrong. Please try again.
                </div>
                :
                <p></p>
                }
            </div>
        )
    }
}

function mapDispatchToProps (dispath) {
    return {
        login:(username,password) => dispath(login(username,password))
    }
}

function mapStateToProps (state) {
    return {
        loginSuccess: state.user.loginSuccess
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);