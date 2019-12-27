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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{fontSize:'20px'}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    this.props.loginSuccess ?
                    <div className="container collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item ml-3">
                            <Link to="/home" style={{color: '#ffffff', textDecoration: 'none', verticalAlign:'middle'}}>
                                Home
                            </Link> 
                        </li>
                        <li className="nav-item ml-3">
                            <div onClick={this.handleLogout} className="btn btn-primary">
                                Logout
                            </div>
                        </li>
                        </ul>
                    </div>
                    :
                    <div className="container collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className=" navbar-nav ml-auto">
                        <li className="nav-item ml-3">
                            <Link to="/login" style={{color: '#ffffff', textDecoration: 'none'}}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item ml-3">
                            <Link to="/register" style={{color: '#ffffff', textDecoration: 'none'}}>
                                Register
                            </Link> 
                        </li>
                        </ul>
                    </div>
                }
            </nav>
        )
    }
}

function mapStateToProps (state) {
    return {
        loginSuccess: state.user.loginSuccess
    }
}

export default connect(mapStateToProps,null)(NavigationBar);