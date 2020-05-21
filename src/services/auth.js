const url = require('./serviceConfig').base;
const http = require('axios')

http.default.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

function login(user) {
    return new Promise((resolve, reject) => {
        try {
            http.post(`${url}/login`, user).then((resp) => {
                resolve(resp.data.result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function register(user) {
    return new Promise((resolve, reject) => {
        try {
            http.post(`${url}/register`, user).then((resp) => {
                resolve(resp.data.result)
            }).catch((err) => {
                reject(err)
            })

        } catch (error) {
            reject(error)
        }
    })
}

function verifyCode(user) {
    return new Promise((resolve, reject) => {
        try {
            http.post(`${url}/confirm`, user).then((resp) => {
                resolve(resp.data.result)
            }).catch((err) => {
                reject(err)
            })

        } catch (error) {
            reject(error)
        }
    })
}

function isExists(username) {
    return new Promise((resolve, reject) => {
        try {
            http.get(`${url}/is-exists/${username}`).then((resp) => {
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
    login,
    register,
    verifyCode,
    isExists
}