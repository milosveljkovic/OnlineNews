import React from 'react';
import { connect } from 'react-redux';
import { requestComments, addComment } from '../store/actions/comments.actions';
import CommentsList from './CommentsList';
import { Link } from 'react-router-dom';
import {likeService} from '../service/service.likes';

class Novelty extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.novelty.likes)
        this.state = {
            authorName: '',
            comment:'',
            dateTime:'',
            errors: false,
            likes: this.props.novelty.likes,
            dislikes: this.props.novelty.dislikes,
            isLike: ''
        }
    }

    componentDidMount() {
        const newsid = this.props.match.params.id;
        this.props.requestComment(newsid);
    }

    isFormEmpty = () => {
        return !this.state.authorName.length || !this.state.comment.length;
    }

    handleAuthorNameChange = (event) => {
        this.setState({authorName:event.target.value})
    }

    handleCommentChange = (event) => {
        this.setState({comment:event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.isFormEmpty()){
            var comment = {
                newsID: this.props.novelty.newsID,
                commentID: this.props.lastId+1,
                username: localStorage.getItem('username'),
                comment: this.state.comment,
                authorName: this.state.authorName,
                dateTime: new Date().getTime()
            }
            this.props.addComment(comment);
            this.setState({errors:false});
            this.setState({
                authorName: '',
                comment:'',
                dateTime:''})
        }
        else {
            this.setState({errors:true})
        }
    }

    like = () => {
        if(localStorage.getItem('username')!==null){
            var like = {
                username: localStorage.getItem('username'),
                newsID: this.props.novelty.newsID,
                isLike: true,
                numberOfLikes: this.props.novelty.likes,
                numberOfDislikes: this.props.novelty.dislikes
            }
            likeService(like);
            this.setState({isLike:true})
            this.setState({likes: this.state.likes+1});
        }
        else{
            console.log("Cannot like")
        }
    }

    dislike = () => {
        if(localStorage.getItem('username')!==null){
            var dislike = {
                username: localStorage.getItem('username'),
                newsID: this.props.novelty.newsID,
                isLike: false,
                numberOfLikes: this.props.novelty.likes,
                numberOfDislikes: this.props.novelty.dislikes
            }
            likeService(dislike);
            this.setState({isLike:false})
            this.setState({dislikes: this.state.dislikes+1});
        }
        else{
            console.log("Cannot dislike")
        }
    }

    render(){
        const {novelty,tags,comments} = this.props;
        const {authorName,comment} = this.state;
        return(
            <div className="container">
                {novelty!==undefined?
                    <div>
                        <img src={novelty.imageURL} style={{width:'100%'}}></img>
                        <h1 className="mt-5">{novelty.title}</h1>
                        <h5 className="mt-3" >by <span style={{color:"#17A2B8"}}>{novelty.journalist}</span> | {novelty.dateOfPublication}</h5>
                        {
                            tags.map(tag => {
                                return(
                                    <Link to={{pathname:`/tag/${tag}`}} className="btn btn-primary mr-2 my-3" key={tag}>{tag}</Link>
                                )
                            })
                        }
                        <p className="my-5" style={{fontSize:"18px"}}>{novelty.description}</p>
                    </div>
                :'no news'
                }

                <hr></hr>
                <div className="text-center my-3">
                    {
                        this.state.isLike===''?
                        <div><button className="btn btn-success mr-2" onClick={() => this.like()}>Like {novelty.likes}</button><button className="btn btn-danger" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button></div>
                        :
                    
                        this.state.isLike===true?
                        <div><button className="btn btn-success mr-2" disabled onClick={() => this.like()}>Like {novelty.likes}</button><button className="btn btn-danger" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button></div>
                        :
                        <div><button className="btn btn-success mr-2" onClick={() => this.like()}>Like {novelty.likes}</button><button className="btn btn-danger" disabled onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button></div>
                       
                    }
                </div>
                <hr></hr>

                <h2 className="text-center">Comments</h2>
                
                {localStorage.getItem('username')!==null?
                    <div className="px-4 py-3" style={{backgroundColor:'white',color:'black', opacity:0.8}}>
                    {this.state.errors===true && (
                        <div className="alert alert-danger" role="alert">
                            Fill all fields!
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" name="authorName" value={authorName} className="form-control" onChange={this.handleAuthorNameChange}  placeholder="Please insert your name"></input>
                        </div>
                        <div className="form-group">
                            <label>Comment: </label>
                            <textarea className="form-control" name="comment" value={comment} onChange={this.handleCommentChange} rows={3} ></textarea>     
                        </div>
                        <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                :
                <div className="px-4 py-3" style={{backgroundColor:'white',color:'black', opacity:0.8}}>
                    {this.state.errors===true && (
                        <div className="alert alert-danger" role="alert">
                            Fill all fields!
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" name="authorName" value={authorName} className="form-control" onChange={this.handleAuthorNameChange}  placeholder="Please insert your name"></input>
                        </div>
                        <div className="form-group">
                            <label>Comment: </label>
                            <textarea className="form-control" name="comment" value={comment} onChange={this.handleCommentChange} rows={3} ></textarea>     
                        </div>
                        <div style={{display:'flex', verticalAlign:'middle'}}>
                        <button type="submit" value="Submit" className="btn btn-primary mr-3" disabled>Submit</button>
                        <h6 style={{color:"red"}}>*Login if you want to comment!</h6>
                        </div>
                    </form>
                </div>
                }
                <CommentsList comments={comments} />
            </div>
        )
        
    }
}

function mapDispatchToProps(dispatch){
    return{
        requestComment: (id) => (dispatch(requestComments(id))),
        addComment:(comment) => dispatch(addComment(comment))
    }
}


function mapStateToProps(state){
    return{
        lastId: state.comments.length,
        comments: state.comments,
        novelty: state.novelty,
        tags: state.novelty.tags,
        username: state.user.username
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Novelty);