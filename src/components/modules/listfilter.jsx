import React from 'react';
import PropTypes from 'prop-types';

const ListFilter = props => {
    let { allGenres, selected, onClickGenre } = props;
    return (
        <ul className="listFilters">
            {
                allGenres.map(
                    (li, i) => <li key={i} className={selected === li.name ? 'active' : ''}><a onClick={() => onClickGenre(li.name)}>{li.name}</a></li>
                )
            }
        </ul>
    );
}
ListFilter.propTypes = {
    allGenres: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onClickGenre: PropTypes.func.isRequired
}
export default ListFilter;