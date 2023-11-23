const express = require( 'express' )
const app = express()
const port = 3000

app.get('/',(req,res) => {
    res.send('hello dekk')
})
app.get('/about',(req,res) => {
    res.send('hello cantik')
})

app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})