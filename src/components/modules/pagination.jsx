import React from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';

const Pagination = props => {
    let { totalItems, itemsPerPage, currentPage, onPageChange } = props;
    if (itemsPerPage === -1) itemsPerPage = totalItems;
    const tp = Math.ceil(totalItems / itemsPerPage); // tp => total pages
    if (isNaN(tp) || tp <= 1) return null; // isNaN is used to handle 0/0 situation
    // const totalPages = _.range(1, tp + 1);
    const totalPages = [...Array(tp)].map((h, i) => (i + 1)); // create array like [1,2,3,4 ... n]

    return (
        <ul className="pagination">
            {
                totalPages.map(
                    page => <li key={page} className={(page === currentPage) ? 'active' : ''}><a onClick={() => onPageChange(page)}>{page}</a></li>
                )
            }
        </ul>
    );
}
Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination;