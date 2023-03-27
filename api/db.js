const { Pool } = require("pg")

const dbConfig = {
    host: 'isilo.db.elephantsql.com',
    user: 'wsdxegai',
    password: 'RoLi7VsoBYzjpGYhI017h7p8sUi5TJoz',
    database: 'wsdxegai',
    port: 5432
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
    const data = [user.name, user.email, user.password, user.is_shaver]

    const result = await pool.query(sql, data)
    const { id } = result.rows[0]

    return id

}

module.exports = {
    deleteUser,
    insertUser
}