const url = require('./serviceConfig').base;
const http = require('axios')


function getUsers() {
    return new Promise((resolve, reject) => {
        try {
            http.get(`${url}/allusers`).then((resp) => {
                resolve(resp.data.result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getUsers
}