import React from 'react';
import { connect } from 'react-redux';
import { requestComments, addComment } from '../store/actions/comments.actions';
import CommentsList from './CommentsList';
import { Link } from 'react-router-dom';
import {likeService} from '../service/service.likes';
import { addLike } from '../store/actions/likes.actions';
import { getNovelty } from '../store/actions/news.actions';
import {addBookmark} from '../store/actions/bookmarks.actions'

class Novelty extends React.Component{

    constructor(props){
        super(props);
       
        var likes = Array.from(this.props.likes);
        var isLike;
        if(localStorage.getItem('username')===null)
            isLike = 'no user';
        likes.map(like => {
            console.log(props.match.params.id)
            if(props.match.params.id===like.newsID)
                isLike = like.isLike;
        })
        console.log(isLike)
        this.state = {
            authorName: '',
            comment:'',
            dateTime:'',
            errors: false,
            likes: this.props.novelty.likes,
            dislikes: this.props.novelty.dislikes,
            isLike: isLike
        }
    }

    componentDidMount() {
        const newsid = this.props.match.params.id;
        this.props.requestComment(newsid);
        this.props.getNovelty(newsid);
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
            var like = {
                username: localStorage.getItem('username'),
                newsID: this.props.novelty.newsID,
                isLike: true,
                numberOfLikes: this.props.novelty.likes,
                numberOfDislikes: this.props.novelty.dislikes
            }
            this.props.addLike(like);
            if(this.state.isLike===true)
                this.setState({isLike:null});
            else if(this.state.isLike===false){
                this.setState({isLike:true});
                this.setState({likes: this.state.likes+1});
            }
            else{
                this.setState({isLike:true});
                this.setState({likes: this.state.likes+1});
            }
            console.log(this.state.isLike)
    }

    dislike = () => {
            var dislike = {
                username: localStorage.getItem('username'),
                newsID: this.props.novelty.newsID,
                isLike: false,
                numberOfLikes: this.props.novelty.likes,
                numberOfDislikes: this.props.novelty.dislikes
            }
            this.props.addLike(dislike);
            if(this.state.isLike===false)
                this.setState({isLike:null});
            else if(this.state.isLike===true){
                this.setState({isLike:false});
                this.setState({dislikes: this.state.dislikes+1});
            }
            else{
                this.setState({isLike:false});            
                this.setState({dislikes: this.state.dislikes+1});
            }
            console.log(this.state.isLike)

    }

    saveBookmark = () => 
    {
        const {novelty} = this.props;
        const date=new Date(novelty.dateOfPublication).getTime();
        const bookmark = {
            username:localStorage.getItem('username'),
            newsID:novelty.newsID,
            title:novelty.title,
            imageURL: novelty.imageURL,
            description: novelty.description,
            dateOfPublication: date,
            journalist:novelty.journalist
        }
        this.props.addBookmark(bookmark);
    }

    alreadySaved = (bookmarks) =>
    {
        var isAlreadySaved=false;
        if(bookmarks!==undefined && this.props.novelty.newsID!==undefined){
            bookmarks.map(bookmark=>{
                if(bookmark.newsID===this.props.novelty.newsID){
                    isAlreadySaved= true;
                }
            })
        }
        return isAlreadySaved;
    }

    render(){
        const {novelty,tags,comments} = this.props;
        const {authorName,comment} = this.state;
        var moment = require('moment');
        var date = Date.parse(novelty.dateOfPublication);
        var d = moment(date).format('LLL');
        return(
            <div className="container">
                {novelty!==undefined?
                    <div>
                        <img src={novelty.imageURL} style={{width:'100%',marginTop:'40px'}}></img>
                        <div>
                            <h1 className="mt-5">{novelty.title}</h1>
                            {
                            !this.alreadySaved(this.props.bookmarks)?
                            <div className="btn btn-secondary float-right" onClick={()=> this.saveBookmark()}>
                                Save
                            </div>
                            :
                            <div className="btn btn-secondary float-right disabled">
                                Save
                            </div>
                            }
                        </div>
                        <h5 className="mt-3" >by <span style={{color:"#17A2B8"}}>{novelty.journalist}</span> | {d}</h5>
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
                        this.state.isLike==='no user'?
                        <div>
                            <button className="btn btn-success mr-2" onClick={() => this.like()} disabled>Like {novelty.likes}</button>
                            <button className="btn btn-danger" onClick={() => this.dislike()} disabled>Dislike {novelty.dislikes}</button>
                        </div>
                        :
                        this.state.isLike===undefined?
                        <div>
                            <button className="btn btn-success mr-2" onClick={() => this.like()}>Like {novelty.likes}</button>
                            <button className="btn btn-danger" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button>
                        </div>
                        :
                        this.state.isLike===null?
                        <div>
                            <button className="btn btn-success mr-2" onClick={() => this.like()}>Like {novelty.likes}</button>
                            <button className="btn btn-danger" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button>
                        </div>
                        :
                        this.state.isLike===false?
                        <div>
                            <button className="btn btn-success mr-2" onClick={() => this.like()}>Like {novelty.likes}</button>
                            <button className="btn btn-warning" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-warning mr-2" onClick={() => this.like()}>Like {novelty.likes}</button>
                            <button className="btn btn-danger" onClick={() => this.dislike()}>Dislike {novelty.dislikes}</button>
                        </div>

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
        addComment:(comment) => dispatch(addComment(comment)),
        addLike: (like) => dispatch(addLike(like)),
        getNovelty: (id) => (dispatch(getNovelty(id))),
        addBookmark:(bookmark)=>(dispatch(addBookmark(bookmark)))
    }
}


function mapStateToProps(state){
    return{
        likes: state.likes,
        lastId: state.comments.length,
        comments: state.comments,
        novelty: state.novelty,
        tags: state.novelty.tags,
        username: state.user.username,
        bookmarks: state.bookmarks
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Novelty);