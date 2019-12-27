import React from 'react';
import { connect } from 'react-redux';

class Novelty extends React.Component{
    render(){
        const {novelty} = this.props;

        return(
            <div className="container">
                {novelty!==undefined?
                    <div style={{textAlign:"center"}}>
                        <img src={novelty.imageURL} style={{width:'90%'}}></img>
                        <h5 className="mt-5" style={{color:"#17A2B8"}}>{novelty.journalist}</h5>
                        <h1 className="mt-2">{novelty.title}</h1>
                        <p className="my-5" style={{fontSize:"18px"}}>{novelty.description}</p>
                    </div>
                :'no news'
                }
            </div>
        )
        
    }
}

function mapStateToProps(state,props){
    //napisati funkciju u servisu koja ce vaditi novost na osnovu newsID
    console.log(props.match.params.id)
    const id = Number(props.match.params.id);
    const news = state.news;
    let novelty;
    if( news!==undefined){
        if(news.length>0){
            novelty=news[id];
        }
    }
    console.log(novelty)
    return{
        novelty:novelty
    }
}

export default connect(mapStateToProps,null)(Novelty);