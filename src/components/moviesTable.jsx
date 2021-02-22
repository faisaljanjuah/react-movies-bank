import React, { Component } from 'react';
import Table from './modules/table';
import Like from './modules/like';
import { Link } from 'react-router-dom';

class MovieTable extends Component {
    columns = [
        { sortBy: 'title', label: 'Movie Title', content: movie => <Link to={`/movies/${movie.title}`}>{movie.title}</Link> },
        { sortBy: 'genre.name', label: 'Genre' },
        { sortBy: 'numberInStock', label: 'Stock' },
        { sortBy: 'dailyRentalRate', label: 'Av. Rating' },
        { label: 'Hit', content: movie => <Like liked={movie.liked} click={() => this.props.onLike(movie)} />, other: this.props.likeAll },
        { label: 'Action', content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger">Delete</button> }
    ];
    render() {
        const { movies, sortColumn, doSort } = this.props;
        return <Table data={movies} sortColumn={sortColumn} doSort={doSort} columns={this.columns} />
    }
}

export default MovieTable;