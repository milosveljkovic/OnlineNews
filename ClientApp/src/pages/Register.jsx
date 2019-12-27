import React from 'react';
import {Redirect} from 'react-router-dom'
import {registerNewUser} from '../service/service.user'

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            registrationSuccess:null,
            usernameCorrect:null,
            passwordCorrect:null
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

     handleError = (username,password) => {
         console.log(username.length,password);
        if(username.length <= 6){
            this.setState({'usernameCorrect':false})
            return false
        }
        else {
            this.setState({'usernameCorrect':true})
        }

        if(password.length <= 6){
            this.setState({'passwordCorrect':false})
            return false;
        }
        else {
            this.setState({'passwordCorrect':true})
        }

        return true;
     }

     onSubmit= () => {
        const {username, password} = this.state;
         if(this.handleError(username,password)){
             var userAuth = {
                 username,
                 password
             }
             registerNewUser(userAuth).then(response=>{
                 if(response.status===200){
                     this.setState({'registrationSuccess':true})
                 }else {
                    this.setState({'registrationSuccess':false})
                 }
             })
         }
     }

    render(){
        const {username,password,registrationSuccess} = this.state;
        console.log(this.state);
        return(
            <div className="container border-bottom shadow mt-3" style={{"width":500}}>
                <form >
                    <div className="form-group">
                        <label >Name</label>
                        <input onChange={this.onChange} value={username} className="form-control" name="username" placeholder="Enter name"/>
                        {
                            this.state.usernameCorrect === true ?
                            <p>
                                <small style={{color:'#32a852'}}>Looks good!</small>
                            </p>
                            :
                            this.state.usernameCorrect === false ?
                            <p>
                                <small  style={{color:'#cf3844'}}>Username require at least 6 characters.</small>
                            </p>
                            :
                            <p></p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.onChange} type="password" value={password} className="form-control" name="password" placeholder="Enter password"/>
                    {
                        this.state.passwordCorrect === true ?
                        <p>
                            <small style={{color:'#32a852'}}>Looks good!</small>
                        </p>
                        :
                        this.state.passwordCorrect === false ?
                        <p>
                            <small style={{color:'#cf3844'}}>Password require at least 6 characters.</small>
                        </p>
                        :
                        <p></p>
                    }
                    </div>
                </form>
                <div className=" text-center mb-3">
                    <button onClick={this.onSubmit}  className="btn btn-primary">Register</button>
                </div>
                {
                registrationSuccess===false?
                <div className="alert alert-danger" role="alert">
                    Something went wrong. Please try again.
                </div>
                :
                registrationSuccess===true?
                <div className="alert alert-success" role="alert">
                    Registration Success!
                </div>
                :
                <p></p>
                }
            </div>
        )
    }
}

// function mapDispatchToProps (dispath) {
//     return {
//         addNewCar:(newCar) => dispath(addNewCar(newCar))
//     }
// }

// function mapStateToProps (state) {
//     return {
//         loginSuccess: state.auth.login_success
//     }
// }


export default Register;