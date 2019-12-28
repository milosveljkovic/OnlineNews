import React from 'react';
import { connect } from 'react-redux';

class Novelty extends React.Component{

    render(){
        const {novelty,tags} = this.props;
        const time = Date(novelty.dateOfPublication)
        return(
            <div className="container">
                {novelty!==undefined?
                    <div>
                        <img src={novelty.imageURL} style={{width:'100%'}}></img>
                        <h1 className="mt-5">{novelty.title}</h1>
                        <h5 className="mt-3" >by <span style={{color:"#17A2B8"}}>{novelty.journalist}</span> | {time}</h5>
                        {
                            tags.map(tag => {
                                return(
                                <div className="btn btn-primary mr-2 my-3">{tag}</div>
                                )
                            })
                        }
                        <p className="my-5" style={{fontSize:"18px"}}>{novelty.description}</p>
                    </div>
                :'no news'
                }

                <hr></hr>

                
            </div>
        )
        
    }
}


function mapStateToProps(state){
    return{
        novelty: state.novelty,
        tags: state.novelty.tags
    }
}

export default connect(mapStateToProps,null)(Novelty);