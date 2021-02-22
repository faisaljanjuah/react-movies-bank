import React, { Component } from 'react';

class Features extends Component {
    state = {
        count: 0
    }
    timer = null;
    goToMovies = () => {
        console.log('Clicked');
        this.setState({ count: this.state.count + 1 });
        // this.props.history.push('/home');
    }
    componentDidMount = () => {
        console.log("I'll run on start, but only once");
        this.timer = setInterval(() => {
            this.setState({ count: this.state.count + 1 });
        }, 1000);
    }
    componentDidUpdate = () => {
        console.log("I'll run on EVERY SET STATE. Count:", this.state.count);
    }
    componentWillUnmount = () => {
        clearInterval(this.timer);
        console.log("I'll run Before UnMOUNT component, but only once");
    }
    render() {
        return (
            <React.Fragment>
                <h1>Features</h1>
                <button className="btn btn-primary" onClick={this.goToMovies}>Movies</button>
            </React.Fragment>
        );
    }
}

export default Features;