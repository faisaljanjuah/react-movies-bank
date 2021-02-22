import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = props => {
    const { columns, sortColumn, doSort, data } = props;
    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} doSort={doSort} />
            <TableBody data={data} columns={columns} />
        </table>
    );
}

export default Table;