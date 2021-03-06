import React from 'react';
import { Link } from 'react-router-dom';
import { getNovelty } from '../store/actions/news.actions';
import { connect } from 'react-redux';

class NewsList extends React.Component{
    render(){
        var news = Array.from(this.props.listOfNews);
        if(news==undefined){
            return (<div>Loading...</div>)
        }
        else{
            return(
                <div>
                <div className="row">
                    {
                        news.map(novelty => {
                            var moment = require('moment');
                            var parseDate = Date.parse(novelty.dateOfPublication);
                            var date = moment(parseDate).startOf('hour').fromNow();
                            return(
                                <div key={novelty.newsID}>
                                    <div className="card mb-3">
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                        <Link to={`/novelty/${novelty.newsID}`} onClick={() => this.props.getNovelty(`${novelty.newsID}`)}>
                                            <img src={novelty.imageURL} className="card-img-top" alt="..."></img>
                                        </Link>
                                        </div>
                                        <div className="col-md-8 d-flex align-items-center">
                                            <div className="card-body" style={{verticalAlign:'middle'}}>
                                            <Link to={`/novelty/${novelty.newsID}`} onClick={() => this.props.getNovelty(`${novelty.newsID}`)} style={{textDecoration:"none",color:'#000000'}}>
                                            <h2 className="card-title text-left" style={{verticalAlign:'middle'}}>{novelty.title} </h2>
                                            </Link>
                                                <p className="text-left" style={{fontSize:'16px'}}>by <span style={{color: 'blue'}}>{novelty.journalist}</span> | {date}</p>
                                            </div>
                                        </div>  
                                        </div>  
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>
            </div>
            )
        }
    }
}

function mapDispatchToProps(dispatch){
    return{
        getNovelty: (id) => (dispatch(getNovelty(id)))
    }
}

export default  connect(null,mapDispatchToProps)(NewsList);