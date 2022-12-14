const express = require('express') // body parser lo trae incluido o npm i body-parser
const cors = require('cors')
const favicon = require('serve-favicon')
const nunjucks = require('nunjucks')
const path = require('path')
// require ('dotenv').config()
// console.log(process.env.ORIGIN)

// documentacion
const swaggerJSDoc = require("swagger-jsdoc"); //
const swaggerUI = require("swagger-ui-express"); //

const app = express()

// middlewares
// permitir acceso a este dominio
// const whiteList = (process.env.ORIGIN)
/* const whiteList = 'https://api-mysql-heroku.herokuapp.com'
app.use(
  cors({
    origin: function(origin, callback) {
      console.log(origin) // muestra dominio q hizo solicitud (url)
      if (whiteList.includes(origin)) {
          return callback(null, origin);
      }
      return callback("No autorizado por CORS");
  },
})) */
// app.use(cors()) // permite todo
app.use(
  cors(
    { origin: 'https://porthbs.herokuapp.com' })) // 'https://api-mysql-heroku.herokuapp.com' })) // http://localhost:8080

// documentacion
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mysql API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "https://api-mysql-heroku.herokuapp.com",
      },
    ],
  },
  apis: ["routes/**/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 3000

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json()) // mejor
// se configura uso de formularios
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const nunj_env = nunjucks.configure(path.resolve(__dirname, "views"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

app.use(require('./routes/routes'))
// app.use('/api/v1', router) // prefijo

app.listen(port, () => console.log(`server runing on port http://localhost:${port}`))

// git push heroku main
// heroku logs --tail
