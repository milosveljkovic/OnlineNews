import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../store/actions/user.actions'

class Home extends React.Component{



    
    render(){
        return(
            <div className="container border-bottom shadow mt-3" style={{"width":500}}>
                TEST
            </div>
        )
    }
}


// function mapDispatchToProps (dispath) {
//     return {
//         login:(username,password) => dispath(login(username,password))
//     }
// }

// function mapStateToProps (state) {
//     return {
//         loginSuccess: state.auth.login_success
//     }
// }


export default Home;