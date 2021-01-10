const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'neebal123',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query(`SELECT * FROM users`, (error, results) => {
        if (error) {
            response.status(500)
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    console.log("Body : " + request.body)
    const { name, email, mobile, city } = request.body

    pool.query('INSERT INTO users (id, name, email, mobile, city, login_time) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6)', [randomNumber(3, 4), name, email, mobile, city, Math.round(new Date().getTime() / 1000)], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send()
    })
}

function randomNumber(min, max) {
    return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
    getUsers,
    createUser
}