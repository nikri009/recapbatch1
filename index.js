const express = require( 'express' )

const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes, DATE } = require('sequelize')
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
app.get('/regist',regist)
app.get('/login',login)

app.post('/login',login)
app.post('/regist',regist)
app.post('/update',update)
app.post('/project',prosesProject)

app.post('/delete/:id',deleteCard)

let data = [];


function regist(req,res){
    res.render('regist')
}
function login(req,res){
    res.render('login')
}

async function home(req,res){
    const query = 'SELECT *from projects'
    const data = await sequelize.query(query,{type: QueryTypes.SELECT})
    // const days = calculateDuration(new Date(data.startDate), new Date(data.endDate))
    // const {duration,unit} = chooseDuration(days)
    var date = data.map(item=>{
    const days = calculateDuration(new Date(item.startDate), new Date(item.endDate))
    const {duration,unit} = chooseDuration(days)

    return {duration,unit}

    })

    // var date = data.map(dataDiri => {
    // const days = calculateDuration(new Date(dataDiri.startDate), new Date(dataDiri.endDate))
    // const {duration,unit} = chooseDuration(days)

    //     return   {
    //         ...data,
    //         duration,
    //         unit
    //     }
    //   })
    // const dataLop = date.forEach(item=>{
    //     item.duration = duration,
    //     item.unit = unit,
    //     item.name = name,
    // })
    // {duration,unit}

    // console.log(data)
    // console.log(date)
    // const days = calculateDuration(new Date(dataDiri.startDate), new Date(dataDiri.endDate))
    // const {duration,unit} = chooseDuration(days)
    
    // data.unshift(date)
    
   
    res.render('index', {data,date},)
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
async function detailCard(req,res) {
    const id = req.params.id

    // const query=`SELECT *FROM projects where id=${id}`;
    // const obj = sequelize.query(query,{type: QueryTypes.UPDATE})
    const query = `SELECT *from projects`
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
   
    res.render('project',{data:obj[id]})
}
async function updateBlog(req,res) {
    const id = req.params.id 

    const query = `SELECT *from projects WHERE id=${id}`
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
    res.render('updateProject',{data:obj[0]})
}

async function update(req,res){
    const id = req.body.id
    const name = req.body.inputName 
    const startDate = req.body.startDate 
    const endDate = req.body.endDate 
    const description = req.body.description
    const technologies = req.body.checkbox
    const image = "bulan.jpg";

    const query = `UPDATE projects SET name='${name}', "startDate"='${startDate}', "endDate"='${endDate}', description='${description}',technologies='{${technologies}}',image='${image}'
    WHERE id='${id}'`
    
    const obj = await sequelize.query(query,{ type: QueryTypes.UPDATE })
    
    console.log(obj)
    res.redirect('/') 
    
}
async function prosesProject(req,res){
    const name = req.body.inputName 
    const startDate = req.body.startDate 
    const endDate = req.body.endDate 
    const description = req.body.description
    const technologies = req.body.checkbox
    const image = "bulan.jpg";

    const query = `INSERT INTO projects(name,"startDate","endDate",description,technologies,image) VALUES ('${name}','${startDate}','${endDate}','${description}','{${technologies}}','${image}')`
    const obj = await sequelize.query(query,{ type: QueryTypes.INSERT })

    // var arrayTanggalLahir = obj.map(function(dataDiri) {
    //     return dataDiri.date;
    //   })
    // console.log('helooo',arrayTanggalLahir)
   
    res.redirect('/') 
}


function calculateDuration(startDate, endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
}
function chooseDuration(days) {
    const years = Math.floor(days / 365)
    const months = Math.floor((days % 365) / 30)
    const remainingDays = days % 30

    if(years > 0) {
        return { duration: years, unit: 'tahun'}
    } else if (months > 0) {
        return { duration: months, unit: 'bulan'}
    } else {
        return { duration: remainingDays, unit: 'hari'}
    }
}

async function deleteCard (req,res) {
    const id = req.params.id

    const query = `DELETE FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query,{ type: QueryTypes.DELETE })
    console.log(obj)
    res.redirect('/')

}


app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})