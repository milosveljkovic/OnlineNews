import React from 'react';
import {connect} from 'react-redux';
import NewsList from '../components/NewsList';



class Home extends React.Component{

    render(){
        const {news} = this.props;
        return(
            <div className="container h1 text-center mt-3" >
                {
                    news===undefined?
                    news.length===0?
                    <h3>No news</h3>
                    :
                    <div>
                        <h1>Latest news</h1>
                        <NewsList listOfNews={news} />
                    </div>
                    :
                    <div>
                        <h1 className="mb-3">Latest news</h1>
                        <NewsList listOfNews={news} />
                    </div>                }
            </div>
        )
    }
}


// function mapDispatchToProps (dispath) {
//     return {
//         login:(username,password) => dispath(login(username,password))
//     }
// }

function mapStateToProps (state) {
    return {
        news: state.news
    }
}


export default connect(mapStateToProps,null)(Home);