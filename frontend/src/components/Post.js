import React, { Component } from 'react';
import PDF from './PDF';

class Post extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        image: '',
        postSubmitted: false
    }

    onChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    submitPost = (e) => {
        
        if(!this.state.title || !this.state.content){
            alert('All fields are required!');
            e.preventDefault();
        }else{
            this.setState({
                postSubmitted: true
            });
        }
    }

    render(){
        return(
            <>
                {  !this.state.postSubmitted ? 
                    (<div className="container">
                        <div className="jumbotron mt-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="well well-sm">
                                        <form className="form-horizontal" method="post">
                                            <fieldset>
                                                <legend className="text-center header">Details of Albums</legend>
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                                    <input onChange={this.onChange('title')} name="title" type="text" placeholder="Machine Name" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                                    <input onChange={this.onChange('image')} name="image" type="text" placeholder="https://" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                                    <input onChange={this.onChange('date')} name="date" type="date" placeholder="Date of issue of the report" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>
                                                    <textarea onChange={this.onChange('content')} className="form-control" name="content" placeholder="Enter your text here" rows="7"></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" onClick={this.submitPost} className="btn btn-primary btn-lg">Submit</button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : (
                        <PDF title={this.state.title} repairedDate={this.state.date} content={this.state.content} image={this.state.image} />
                    )
                }
            </>
        );
    }
}

export default Post;