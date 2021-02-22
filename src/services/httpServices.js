import axios from "axios";
import { toast } from "react-toastify";

// axios.interceptors.resopnse.use(null, error => {
//     const expectedError =
//         error.resopnse &&
//         error.resopnse.status >= 400 &&
//         error.resopnse.status < 500;

//     if (!expectedError) {
//         // logger.log(error);
//         toast.error("An unexpected error occured");
//     }

//     return Promise.reject(error);

// });

export default {
    get: axios.get,
    post: axios.post,
}