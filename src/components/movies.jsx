import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import AddMovie from './../pages/addNew';
import { getMovies } from './movieService';
import RecordsPerPage from './modules/recordsperpage';
import MovieTable from './moviesTable';
import ListFilter from './modules/listfilter';
import Pagination from './modules/pagination';
import { paginate } from './utils/paginate';
import FormField from './modules/formField';
import _ from 'lodash';

// import $ from 'jquery';
// import { Modal } from 'bootstrap';
import GetGenres from './modules/genres';

class Movies extends Component {
    state = {
        movies: [],
        currentPage: 1,
        rowsPerPage: 4,
        selectedGenre: 'All Genres',
        sortColumn: { column: 'title', order: 'asc' },
        notice: { className: '', msg: '' },
        addMovie: {
            title: '',
            genre: '',
            stock: '',
            rating: ''
        }
    }

    componentDidMount() {
        this.setState({ movies: getMovies() });
    }

    makeid = length => {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    likeAll = () => {
        const movies = this.state.movies.filter(
            m => m.liked = true
        );
        this.setState({ movies });
    }

    pageChange = page => {
        if (page === 'last') {
            const lastPage = Math.ceil(this.state.movies.length / this.state.rowsPerPage);
            page = lastPage;
        }
        this.setState({ currentPage: page });
    }

    deleteMovie = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies }, function () {
            const currentPage = this.state.currentPage;
            const lastPage = Math.abs(Math.ceil(this.state.movies.length / this.state.rowsPerPage));
            if (currentPage > lastPage) {
                this.pageChange('last');
            }
        });
    }

    showRowsOnPage = v => {
        const rowsPerPage = parseInt(v.target.value);
        this.setState({ rowsPerPage });
    }

    addMovieForm = (e) => {
        e.preventDefault();
        let addMovie = true;
        let fields = [e.target.elements.title, e.target.elements.genre, e.target.elements.stock, e.target.elements.rating];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.length < 1 || fields[i].value === "") {
                addMovie = false;
                fields[i].classList.add("error");
                this.setState({ notice: { className: 'failed', msg: 'Please fill in required fields.' } });
            }
            else { fields[i].classList.remove("error"); }
        }
        if (addMovie) {
            let addInTable = true;
            let movies = this.state.movies; // list of Old movies
            // let filterFrom = this.state.filterFrom;
            for (let c = 0; c < movies.length; c++) {
                let title = e.target.elements.title.value.toLowerCase().replace(/\s\s+/g, ' ');
                if (title === movies[c].title.toLowerCase().replace(/\s\s+/g, ' ')) {
                    addInTable = false
                };
            }
            if (addInTable) {
                let newMovie = {
                    _id: this.makeid(24),
                    title: e.target.elements.title.value,
                    // genre: this.getGenre(e.target.elements.genre.value),
                    genre: GetGenres(e.target.elements.genre.value),
                    numberInStock: e.target.elements.stock.value,
                    dailyRentalRate: e.target.elements.rating.value,
                    liked: false
                };
                movies.unshift(newMovie); // prepend new Movie in Old list
                this.setState({ movies, notice: { className: 'success', msg: 'Success: Movie added successfully.' } });
                // filterFrom.unshift(newMovie); // prepend new Movie in list from Server, this will sync with "movies" object
                // this.setState({ filterFrom, notice: { className: 'success', msg: 'Success: Movie added successfully.' } });
            }
            else {
                this.setState({ notice: { className: 'failed', msg: 'Failed: Movie already exist.' } });
            }
        }
    }

    resetValidation = () => {
        const addNewMovieForm = document.getElementById('addNewMovie');
        let fields = [addNewMovieForm.title, addNewMovieForm.genre, addNewMovieForm.stock, addNewMovieForm.rating];
        fields.forEach(function (field) {
            field.classList.remove("error");
        });
        addNewMovieForm.reset();

        const addMovie = { ...this.state.addMovie };
        addMovie.title = "";
        addMovie.genre = "";
        addMovie.stock = "";
        addMovie.rating = "";
        const notice = { ...this.state.notice };
        notice.className = "";
        notice.msg = "";
        this.setState({ addMovie, notice });
    }

    // vOnChange = e => {
    //     (e.target.value === "" || e.target.value.length < 1) ? e.target.classList.add("error") : e.target.classList.remove("error");
    // }

    vOnChange = ({ currentTarget: field }) => {
        const addMovie = { ...this.state.addMovie };
        (field.value === "" || field.value.length < 1) ? field.classList.add("error") : field.classList.remove("error");
        addMovie[field.name] = field.value;
        this.setState({ addMovie });
    }

    filterGenres = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleSort = sortColumn => {
        // let order = this.state.sortColumn.order;
        // let currentColumn = this.state.sortColumn.column;
        // column === currentColumn && order === 'asc' ? order = 'desc' : order = 'asc';
        this.setState({ sortColumn });
    }

    searchMovie = () => {
        // 
    }

    render() {
        const notice = this.state.notice;
        const { currentPage, selectedGenre, sortColumn, movies: allMovies, addMovie } = this.state;

        const filtered = GetGenres(selectedGenre) && GetGenres(selectedGenre)._id ? allMovies.filter(
            m => m.genre.name === GetGenres(selectedGenre).name
        ) : allMovies;
        const { length: count } = filtered;

        const sorted = _.orderBy(filtered, sortColumn.column, sortColumn.order);

        let { rowsPerPage } = this.state;
        if (rowsPerPage === -1 || sorted.length <= rowsPerPage) rowsPerPage = count;
        const movies = paginate(sorted, currentPage, rowsPerPage);
        return (
            <main className="container-fluid">
                <Link to="/movies/new" className="btn btn-primary pull-left">Add Movies from Page</Link>
                <input type="text" placeholder="Search" className="search" onChange={this.searchMovie} />
                <button onClick={this.resetValidation} className="btn btn-success pull-right" data-toggle="modal" data-target="#myModal">Add New Movie</button>
                <div className="clearfix"></div>
                <div className="mb-10"></div>
                {
                    <React.Fragment>
                        <ListFilter allGenres={GetGenres('all')} selected={selectedGenre} onClickGenre={this.filterGenres} />
                        <div className="moviesContainer">
                            <p className="tableInfo">Showing {count} Movies in the DB</p>
                            <RecordsPerPage perPage={this.showRowsOnPage} currentlyShowing={rowsPerPage} totalRecords={count} />
                            <MovieTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.deleteMovie} likeAll={this.likeAll} doSort={this.handleSort} />
                            <Pagination totalItems={count} itemsPerPage={rowsPerPage} onPageChange={this.pageChange} currentPage={currentPage} />
                        </div>
                    </React.Fragment>
                }
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <form onSubmit={this.addMovieForm} id="addNewMovie">
                            <div className="modal-content">
                                <div className="modal-header d-block">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Add New Movie</h4>
                                </div>
                                <div className="modal-body">
                                    <FormField label="Movie Title" type="text" name="title" id="movieTitle" value={addMovie.title} onChange={this.vOnChange} />

                                    <FormField label="Genre" type="select" name="genre" id="movieGenre" value={addMovie.genre} onChange={this.vOnChange} options={GetGenres('all')} />

                                    <FormField label="Stock" type="number" name="stock" id="movieStock" value={addMovie.stock} onChange={this.vOnChange} />

                                    <FormField label="Average Rating" type="number" step="0.5" name="rating" id="movieRating" value={addMovie.rating} onChange={this.vOnChange} />
                                </div>
                                <div className="modal-footer d-block">
                                    {<p className={`notice ${notice.className}`}>{`${notice.msg}`}</p>}
                                    <button type="submit" className="btn btn-primary btn-wide">Add</button>
                                    <button type="button" className="btn btn-default btn-wide" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}

export default Movies;