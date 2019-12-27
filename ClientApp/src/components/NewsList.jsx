import React from 'react';
import { Link } from 'react-router-dom';

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
                        news.slice(0,6).map(novelty => {
                            return(
                                <div key={novelty.newsID} className="col-4 p-0">
                                    <div className="card">
                                        <Link to={`/novelty/${novelty.newsID}`}>
                                            <img src={novelty.imageURL} className="card-img-top" alt="..."></img>
                                        </Link>
                                        <div className="card-body">
                                            <h3 className="card-title text-left">{novelty.title}</h3>
                                            <p className="text-left" style={{fontSize:'20px'}}>by <span style={{color: 'blue'}}>{novelty.journalist}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>

                <hr></hr>

                <h3>Latest news</h3>
                <div className="row">
                    {
                        news.map(novelty => {
                            return(
                                <div>
                                    <div className="card mb-3">
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={novelty.imageURL} className="card-img-top" alt="..."></img>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body" style={{verticalAlign:'middle'}}>
                                                <h3 className="card-title text-left" style={{verticalAlign:'middle'}}>{novelty.title}</h3>
                                                <p className="text-left" style={{fontSize:'20px'}}>by <span style={{color: 'blue'}}>{novelty.journalist}</span></p>
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

export default NewsList;