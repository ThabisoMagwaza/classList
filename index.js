let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let mainRouter = require('./mainRoutes')
let classRouter = require('./classRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/cdn', express.static('public'))
app.use(mainRouter)
app.use('/class', classRouter)

let port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port', port)
