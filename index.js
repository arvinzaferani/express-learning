const express = require(`express`)
const app = express()
const port = 3001
app.use(express.json) // midlleware to parse json body
app.get('/',(req, res)=>{
    res.send('kossher')
})
app.listen(port,(req, res) => {
        console.log(`server is running on http://localhost:${port}`)
})