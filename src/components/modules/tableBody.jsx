import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.sortBy);
    }
    render() {
        const { data, columns } = this.props;
        return (
            <tbody>
                {
                    data.map(
                        (item, i) => <tr key={i}>
                            {columns.map(
                                (column, j) => {
                                    return <td key={j}>{this.renderCell(item, column)}</td>
                                }
                            )}
                        </tr>
                    )
                }
            </tbody>
        );
    }
}

export default TableBody;