const express = require('express') // body parser lo trae incluido
// initializations
const app = express()
const {createPool} = require('mysql2/promise')
const key = require('./key')
const { env } = require('process')

async function main() {

  const conn = await createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    ssl: {
      rejectUnauthorized: false
    },
    database: process.env.db_name
  })

  // conn.query( 'create table users(name varchar(255))' )

   const resp = await conn.query( 'select * from users' )
  // console.log('first ', resp[0])
}
main()



// settings
// const port = 3000
app.set('port', process.env.PORT || 3000) // produccion o local

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// global vars

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   database : 'company'
// })
// simple query
/* connection.query(
  'SELECT * FROM employees',
  function(err, results, fields) {
    console.log('ser results ',results); // results contains rows returned by server
    console.log('ser fields',fields); // fields contains extra meta data about results, if available
  }
); */
// connection.connect()

/* connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */
 
// connection.end()

/* connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
}) */

// routes
//app.use(require('./routes/employess'))

// start server
app.listen(app.get('port'), () => {
  console.log(`Servidor en puerto http://localhost:` + app.get('port'))
})

// nodemon server
// al llamarse index se ejecuta auto en package
// npm start