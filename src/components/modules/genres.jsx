// import React from 'react';
// import config from "../../config/config.json";
// import GetGenres from './genres';
// import http from '../../services/httpServices.js';

// export default GetGenres = slName => {
//     return http.get(config.apiURL + 'api/getGenres.php');
// }

const GetGenres = slName => { // selected Name
    const genres = [
        { _id: "", name: "All Genres" },
        { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
        { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        { _id: "5b21ca3eeb7f6fbccd471843", name: "Adventure" },
        { _id: "5b21ca3eeb7f6fbccd471823", name: "Animation" },
        { _id: "5b21ca3eeb7f6fbccd471865", name: "Crime" },
        { _id: "5b21ca3eeb7f6fbccd471898", name: "Horror" },
        { _id: "5b21ca3eeb7f6fbccd471808", name: "Sci-Fi" }
    ];
    for (let gn = 0; gn < genres.length; gn++) {
        if (slName === genres[gn].name) return genres[gn];
        if (slName === 'all') {
            let allGenre = [];
            for (let all = 0; all < genres.length; all++) {
                let obj = {};
                obj.name = genres[all].name;
                if (genres[all]._id.length > 0) {
                    obj.value = genres[all].name;
                }
                allGenre.push(obj);
            }
            return allGenre;
        }
    }
    return [];
}

export default GetGenres;