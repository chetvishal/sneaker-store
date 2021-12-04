const Users = [
    {
        username: "cvishal",
        password: "12345"
    },
    {
        username: "richard",
        password: "12345"
    },
    {
        username: "adhya",
        password: "12345"
    }
]

function findUserInDB(username) {
    return Users.find(user => user.username === username)
}

export const fakeAuthApi = (username, password) => {
    return new Promise((resolve, reject) => {
        try {
            const user = findUserInDB(username)
            user.password === password ? resolve({ success: true, status: 200 })
                : reject({ success: false, status: 401 })
        } catch (error) {
            reject({ success: false, status: 500 })
        }
    })
}