import React from 'react';
import {connect} from 'react-redux';
import NewsList from '../components/NewsList';
import {getNewsByTag} from '../store/actions/news-by-tag.actions'


class TagNews extends React.Component{

    componentDidMount = () => {
      this.getData();
    }

    getData= () => {
        console.log(this.props);
        this.props.getNewsByTag(this.props.match.params.tag);
    }
    

    render(){
        const {news_by_tag} = this.props;

        return(
            <div className="container h1 text-center mt-3" >
                {
                    news_by_tag===undefined?
                    <h3>Loading...</h3>
                    :
                    news_by_tag.length===0?
                    <h3>No news for this tag</h3>
                    :
                    <NewsList listOfNews={news_by_tag} />
                }
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return {
        getNewsByTag:(tag)=>dispatch(getNewsByTag(tag))
    }
}

function mapStateToProps (state) {
    return {
        news_by_tag: state.news_by_tag
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TagNews);