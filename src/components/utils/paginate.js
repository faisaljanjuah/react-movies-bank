// import _ from 'lodash';
// export function paginate(total, currentPage, itemsPerPage) {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentRows = [];
//     for (let i = startIndex; i < (startIndex + itemsPerPage); i++) {
//         if (total[i] !== undefined) {
//             currentRows.push(total[i]);
//         }
//     }
//     return currentRows;
//     // return _(total).slice(startIndex).take(itemsPerPage).value();
// }

export function paginate(totalItems, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRows = [];
    for (let i = startIndex; i < (startIndex + itemsPerPage); i++) {
        if (totalItems[i] !== undefined) {
            currentRows.push(totalItems[i]);
        }
    }
    return currentRows;
}