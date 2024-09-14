import express from 'express'
import { dbConn } from './database/dbConnection.js'
const app = express()
const port = 300


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))