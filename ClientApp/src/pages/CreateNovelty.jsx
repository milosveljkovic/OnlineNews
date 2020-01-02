import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {addNoveltyService} from '../service/service.news'
const uuidv1 = require('uuid/v1');

class CreateNovelty extends React.Component{

    constructor(){
        super();
        this.state={
            journalist:"",
            noveltyDescription:"",
            noveltyImageUrl:"",
            newsTitle:"",
            noveltyTags:"",
            success:null
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

     onClear = () => {
        this.setState({
            "journalist":"",
            "noveltyDescription":"",
            "noveltyImageUrl":"",
            "newsTitle":"",
            "noveltyTags":"",
            "success":null
        })
     }

     onSubmit= () => {
         const {journalist, noveltyDescription, noveltyImageUrl,newsTitle,noveltyTags} = this.state;
         const formatedTags=noveltyTags.split(',');
         const newNovelty = {
             newsID:uuidv1(),
             title:newsTitle,
             imageURL: noveltyImageUrl,
             description: noveltyDescription,
             likes:0,
             dislikes:0,
             journalist:journalist,
             tags:formatedTags,
             dateOfPublication: new Date().getTime()   //date in milliseconds
         }
         console.log(newNovelty)
         addNoveltyService(newNovelty).then(response=>{
             if(response.status===200){
                this.setState({'success':true})
             }else{
                this.setState({'success':false})
             }
         })
     }

    render(){

        if(!localStorage.getItem('isJournalist')) {
            return <Redirect to="/home" />
        }

        const {journalist, noveltyDescription, noveltyImageUrl,newsTitle,noveltyTags,success} = this.state;

        return(
            <div className="container border-bottom shadow mt-3"style={{"width":500}}>
                <form >
                    <div className="form-group">
                        <label >Title</label>
                        <input onChange={this.onChange} value={newsTitle} className="form-control" name="newsTitle" placeholder="Enter Title"/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea onChange={this.onChange} className="form-control" id='a' name='noveltyDescription' value={noveltyDescription} rows="3" placeholder="Description.."/>
                    </div>
                    <div className="form-group">
                        <label>Image url</label>
                        <input onChange={this.onChange}  value={noveltyImageUrl} className="form-control" name="noveltyImageUrl" placeholder="Url.."/>
                    </div>
                    <div className="form-group">
                        <label >Your signature</label>
                        <input onChange={this.onChange} value={journalist} className="form-control" name="journalist" placeholder="Enter your signature"/>
                    </div>
                    <div className="form-group">
                        <label >Tags</label>
                        <input onChange={this.onChange} value={noveltyTags} className="form-control" name="noveltyTags" placeholder="Enter tags"/>
                    </div>
                </form>
                <div className="container text-center mb-3">
                    <button onClick={this.onSubmit}  className="btn btn-primary">Create Novelty</button>
                    <button onClick={this.onClear}  className="btn btn-primary ml-2">Clear fields</button>
                </div>
                {
                success===false?
                <div className="alert alert-danger" role="alert">
                    Something went wrong. Please try again.
                </div>
                :
                success===true?
                <div className="alert alert-success" role="alert">
                    Success!
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


export default withRouter(connect(null,null)(CreateNovelty));