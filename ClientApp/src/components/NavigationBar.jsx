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
        localStorage.clear();
        window.location.reload(true);
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{fontSize:'20px'}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="container collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                        <li className="navbar-nav nav-item mr-5">
                            <Link to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>
                                Home
                            </Link> 
                        </li>
                        <div className="navbar-nav ml-auto">
                            <li className="navbar-nav nav-item ">
                                <Link to="/tag/sport" style={{color: '#ffffff', textDecoration: 'none'}}>
                                    Sport
                                </Link> 
                            </li>
                            <li className="navbar-nav nav-item ml-4">
                                <Link to="/tag/science" style={{color: '#ffffff', textDecoration: 'none'}}>
                                    Science
                                </Link> 
                            </li>
                            <li className="navbar-nav nav-item ml-4">
                                <Link to="/tag/tech" style={{color: '#ffffff', textDecoration: 'none'}}>
                                    Tech
                                </Link> 
                            </li>
                        </div>
                            {
                                (localStorage.getItem('username') && (localStorage.getItem('isJournalist')==='true'))?
                                <li className="navbar-nav nav-item ml-auto">
                                    <Link to="/create-novelty" style={{color: '#ffffff', textDecoration: 'none'}}>
                                        Publish
                                    </Link>
                                </li>
                                :
                                null
                            }
                            {
                                (localStorage.getItem('username') && (localStorage.getItem('isJournalist')==='false'))?
                                <li className="navbar-nav nav-item ml-auto">
                                    <Link to="/bookmarks" style={{color: '#ffffff', textDecoration: 'none'}}>
                                        Bookmarks
                                    </Link>
                                </li>
                                :
                                null
                            }
                            {
                            localStorage.getItem('username')?
                            <li className="navbar-nav nav-item ml-3">
                                <div onClick={this.handleLogout} className="btn btn-primary">
                                    Logout
                                </div>
                            </li>
                            :
                            null
                            }
                            {
                                !localStorage.getItem('username')?
                                <li className="navbar-nav nav nav-item ml-auto">
                                    <Link to="/login" style={{color: '#ffffff', textDecoration: 'none'}}>
                                        Login
                                    </Link>
                                </li>
                                :
                                null
                            }
                            {
                                !localStorage.getItem('username')?
                                <li className="navbar-nav nav nav-item ml-3">
                                    <Link to="/register" style={{color: '#ffffff', textDecoration: 'none'}}>
                                        Register
                                    </Link>
                                </li>
                                :
                                null
                            }
                    </div>
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