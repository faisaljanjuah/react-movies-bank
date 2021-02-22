import React from 'react';

const RecordsPerPage = props => {
    const { perPage, currentlyShowing, totalRecords } = props;
    let ppd = currentlyShowing, active = ''; // ppd => per page selection value
    let records = '';
    if (currentlyShowing === totalRecords) { // total == total
        ppd = -1;
    }
    const selectionOpts = [
        {
            text: 4,
            value: 4
        },
        {
            text: 8,
            value: 8
        },
        {
            text: 12,
            value: 12
        },
        {
            text: 'All',
            value: -1
        }
    ];
    for (let sl in selectionOpts) {
        if (ppd === selectionOpts[sl].value) {
            // selectionOpts[sl].selected = true;
            active = selectionOpts[sl].value;
            records = selectionOpts[sl].text;
        }
    }
    console.log(selectionOpts);
    return (
        <div className="rowsPerPage">
            <label>Showing {<span style={{ textTransform: 'lowercase' }}>{records}</span>} records on page: </label>
            <select value={active} onChange={perPage}>
                {
                    selectionOpts.map(
                        opt => <option key={opt.value} value={opt.value}>{opt.text}</option>
                    )
                }
            </select>
        </div>
    );
}

export default RecordsPerPage;