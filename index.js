const express = require( 'express' )

const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)



app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'src/views'))

app.use("/assets",express.static('src/assets'))
app.use(express.urlencoded({extended: false}))

app.get('/',home)
app.get('/project',project)
app.get('/contact-me',contact)
app.get('/testimonial', testimonial)
app.get('/detail/:id',detailCard)
app.get('/update/:id',updateBlog)

app.post('/update',update)
app.post('/project',prosesProject)

app.post('/delete/:id',deleteCard)

let data = [];


async function home(req,res){
    const query = 'SELECT *from projects'
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
    

    res.render('index', {data: obj})
}
function project(req,res){
    res.render('addProject')
}
function contact(req,res){
    res.render('contact')
}
function testimonial(req,res){
    res.render('testimonial')
}
function detailCard(req,res) {
    const id = req.params.id

    const dataIndex = data[parseInt(id)]
    dataIndex.id = parseInt(id)
    res.render('project',{data: dataIndex})
}
function updateBlog(req,res) {
    const id = req.params.id

    const dataIndex = data[parseInt(id)]
    dataIndex.id = parseInt(id)
    res.render('updateProject',{data: dataIndex})
}

function update(req,res){
    const id = req.body.id
    const name = req.body.inputName 
    const startDate = req.body.startDate 
    const endDate = req.body.endDate 
    const desc = req.body.description
    const checkbox = req.body.checkbox
    
    
    let date =  calculateDuration(startDate, endDate)
    
     
    data[parseInt(id)] = {
        name,
        date,
        desc,
        checkbox,

    }
    
    res.redirect('/') 
}
function prosesProject(req,res){
    const name = req.body.inputName 
    const startDate = req.body.startDate 
    const endDate = req.body.endDate 
    const desc = req.body.description
    const checkbox = req.body.checkbox

    console.log(startDate)
    let date =  calculateDuration(startDate, endDate)
    
     
    const dataBlog = {
        name,
        date,
        desc,
        checkbox,
        startDate,
        endDate
    }
    
    data.unshift(dataBlog)
    res.redirect('/') 
}


function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} hari`
}

function deleteCard (req,res) {
    const id = req.params.id

    data.splice(id,1)
    res.redirect('/')

}


app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})