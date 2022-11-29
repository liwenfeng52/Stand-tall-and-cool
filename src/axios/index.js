import axios from "axios"
let url = "http://127.0.0.1:3000/"
export function get(key) {
    return axios({
        url: url + key,
        method: "get",
    })
}
export function post(key, data = {}) {
    return axios({
        url: url + key,
        method: "post",
        data
    })
}