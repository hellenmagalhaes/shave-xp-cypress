const { Pool } = require("pg")

const dbConfig = {
  host: 'isilo.db.elephantsql.com',
  user: 'wsdxegai',
  password: 'RoLi7VsoBYzjpGYhI017h7p8sUi5TJoz',
  database: 'wsdxegai',
  port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
          const pool = new Pool(dbConfig)

          pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
            if (error) {
              throw error
            }
            resolve({sucess: result})
          })
        })
      }
}
    
