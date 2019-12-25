import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { createBrowserHistory } from 'history';

class NavigationBar extends React.Component{

    constructor(){
        super();
        this.state={

         }
    }

    handleLogout = () => {
        // localStorage.clear();
        // window.location.reload(true);
        //handle here logout
    }

    render(){
        return(
            <div className="container" style={{"backgroundColor":"#e1dee4"}}>
                {
                    this.props.loginSuccess ?
                    <ul className="nav justify-content-end">
                        <li className="nav-item m-2">
                            <Link to="/home">
                                Home2
                            </Link> 
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/home">
                                Home
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <button onClick={this.handleLogout} className="btn btn-primary">
                                Logout
                            </button> 
                        </li>
                    </ul>
                    :
                    <ul className="nav justify-content-end">
                        <li className="nav-item m-2">
                            <Link to="/login">
                                Login
                            </Link> 
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/register">
                                Register
                            </Link> 
                        </li>
                    </ul>
                }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        loginSuccess: state.user.loginSuccess
    }
}

export default connect(mapStateToProps,null)(NavigationBar);