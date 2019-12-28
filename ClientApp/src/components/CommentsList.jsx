import React from 'react';

class CommentsList extends React.Component {
    render() {

        var comments = Array.from(this.props.comments)
        return(
            <div className="mt-3 pr-3" style={{color:'white', width:'100%'}}>
               {
                   comments!==undefined?
                   comments
                   .map((comment) => (
                        <div key={comment.commentID} className="px-5 py-4"  style={{borderBottom:'1px solid grey',backgroundColor:'white',color:'black', opacity:0.8}}>
                            <div style={{display:'flex'}}><h5 className="mr-3">{comment.authorName}</h5><p className="mr-3">o</p><p>{comment.dateTime}</p></div>
                            <p style={{fontSize:'18px', margin:'0px'}}>{comment.comment}</p>
                        </div>
                   ))
                   :
                   'none'
               }
               {
                   this.props.comments.length === 0?
                   <div  className="px-4 py-3 text-center" style={{backgroundColor:'white',color:'black', opacity:0.8}}>
                        <h4>There are no comments for this novelty.</h4>
                    </div>
                    :
                    ''
               }
            </div>
        )
    }
}


export default CommentsList;
