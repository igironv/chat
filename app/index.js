const express = require('express')
const app = express()

app.use(express.static('app/static'))
app.use(express.static('app/html'))

let port = 8080
app.listen(port, () => console.log(`http://localhost:${port}`))
