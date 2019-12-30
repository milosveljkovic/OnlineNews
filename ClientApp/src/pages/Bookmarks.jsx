import React from 'react';
import {connect} from 'react-redux';
import NewsList from '../components/NewsList';
import {getNewsByTag} from '../store/actions/news-by-tag.actions'


class Bookmarks extends React.Component{
    constructor(props){
        super(props);
    }
    

    render(){
        const {bookmarks} = this.props;
        return(
            <div className="container h1 text-center mt-3" >
                <h1 className="mb-3">My Bookmarks</h1>
                {
                    bookmarks===undefined?
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    :
                    bookmarks.length===0?
                    <h3>No news for this tag</h3>
                    :
                    <NewsList listOfNews={bookmarks} />
                }
            </div>
        )
    }
}

// function mapDispatchToProps (dispatch){
//     return {
//         getNewsByTag:(tag)=>dispatch(getNewsByTag(tag))
//     }
// }

function mapStateToProps (state) {
    return {
        bookmarks: state.bookmarks
    }
}


export default connect(mapStateToProps,null)(Bookmarks);