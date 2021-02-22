import React, { Component } from 'react';

class TableHeader extends Component {
    sorting = column => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.column === column) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else {
            sortColumn.column = column;
            sortColumn.order = 'asc';
        }
        this.props.doSort(sortColumn);
    }

    sortIcon = column => {
        const { sortColumn } = this.props;
        if (sortColumn.column !== column) return 'pointer';
        if (sortColumn.order === 'asc') return 'pointer sort_asc';
        return 'pointer sort_desc';
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.columns.map(
                            (c, i) =>
                                <th key={i}>
                                    {
                                        c.sortBy ?
                                            <span className={this.sortIcon(c.sortBy)} onClick={() => this.sorting(c.sortBy)}>{c.label}</span> :
                                            c.other ?
                                                <span className="pointer" onClick={c.other}>{c.label}</span>
                                                : c.label
                                    }
                                </th>
                        )
                    }
                </tr>
            </thead>
        );
    }
}

export default TableHeader;