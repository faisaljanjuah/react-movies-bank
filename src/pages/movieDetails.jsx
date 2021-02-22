import React, { Component } from 'react';

class MovieDetails extends Component {
    saveMovie = () => {
        this.props.history.push('/movies');
    }
    render() {
        return (
            <div className="text-left">
                <h1>Movie Name: {this.props.match.params.title}</h1>
                <button onClick={this.saveMovie} className="btn btn-success">Save</button>
            </div>
        );
    }
}

export default MovieDetails;