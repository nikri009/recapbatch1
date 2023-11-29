const express = require( 'express' )

const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes, DATE } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bycrpt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')



app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'src/views'))

app.use("/assets",express.static('src/assets'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure:false,
        maxAge: 1000 * 60 * 60 * 24
        
    }//jika sudah selesai di devploment ubah ke true
  }))

// routing

app.get('/',home)
app.get('/project',project)
app.get('/contact-me',contact)
app.get('/testimonial', testimonial)
app.get('/detail/:id',detailCard)
app.get('/update/:id',updateBlog)
app.get('/regist',registView)
app.get('/login',loginView)

app.post('/login',login)
app.post('/regist',regist)
app.post('/update',update)
app.post('/project',prosesProject)

app.post('/delete/:id',deleteCard)

let data = [];



async function home(req,res){
    const query = 'SELECT *from projects'
    const data = await sequelize.query(query,{type: QueryTypes.SELECT})
    
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
    const isLogin = req.session.isLogin
    const user = req.session.user
    res.render('index', {data,user, isLogin})
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

function registView(req,res){
    res.render('regist')
}
async function regist(req,res){
    const { name, email, password} = req.body
    const salt = 10
    bycrpt.hash(password, salt, async (err,hash)=>{
        if(err){
            req.flash('danger','Register failed')
            res.redirect('/regist')
        }
        req.flash('success','Create Acount success')
        const query = `INSERT INTO users(name,email,password) VALUES ('${name}','${email}','${hash}')`
        const obj = await sequelize.query(query,{ type: QueryTypes.INSERT })

    } )

    res.redirect('/login')
}
function loginView(req,res){
    res.render('login')
}
async function login(req,res){
    const {email,password}=req.body
    const query = `SELECT *FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

    if(obj.length == 0){
        console.log("your Account not Found!!")
        return res.redirect('/login')
    }

    bycrpt.compare(password,obj[0].password,(err,result)=>{
        if(!result){
            req.flash('denger','ERROR to login, please check your email or password again!!')
            // console.error("your Password error!") proses jika salah password
            return res.redirect('/login')
        }
        req.flash('success','Login success')
        req.session.isLogin = true
        req.session.user = {
            name : obj[0].name,
            email: obj[0].email
        }
        res.redirect('/')
        
    })

    // res.redirect('login')
}

app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})