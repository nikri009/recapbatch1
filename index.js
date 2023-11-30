const express = require( 'express' )

const path = require('path')
const app = express()
const port = 3000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize(config.development)
const bycrpt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middleweres/uploadFile')



app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'src/views'))

app.use("/assets",express.static(path.join(__dirname,'src/assets')))
app.use("/upload",express.static(path.join(__dirname,'src/upload')))
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
app.get('/logout',logout)

app.post('/login',login)
app.post('/regist',regist)
app.post('/update', upload.single("image"),update)
app.post('/project', upload.single("image"),prosesProject)

app.post('/delete/:id',deleteCard)

let data = [];



async function home(req,res){
    const query = `SELECT projects.id,projects.name,projects."startDate",projects."endDate",projects.description,projects.technologies,
    projects.image,projects."createdAt",projects."updatedAt",users.name 
    AS author FROM projects LEFT JOIN users ON projects.author_id = users.id`
    const data = await sequelize.query(query,{type: QueryTypes.SELECT})
    
    var date = data.map(item=>{
    const days = calculateDuration(new Date(item.startDate), new Date(item.endDate))
    const {duration,unit} = chooseDuration(days)

    return {duration,unit}

    })
    
    const isLogin = req.session.isLogin
    const user = req.session.user
 
    res.render('index', {data,user, isLogin})
}
function project(req,res){
    const isLogin = req.session.isLogin
    const user = req.session.user
    if(!isLogin){
        
        res.render('login')
    }else{
        res.render('addProject',{isLogin,user})
    }
   
   
}
function contact(req,res){
    const isLogin = req.session.isLogin
    const user = req.session.user
    if(!isLogin){
        res.render('login')  
    }else{
        res.render('contact',{isLogin, user})
    }
   
}
function testimonial(req,res){
    const isLogin = req.session.isLogin
    const user = req.session.user
    if(!isLogin){
        res.render('login')  
    }else{
        res.render('testimonial',{isLogin,user})
    }
  
    
}
async function detailCard(req,res) {
    const id = req.params.id
    const isLogin = req.session.isLogin
    if(!isLogin){
        res.render('login')  
    }else{
        const query = `SELECT projects.id,projects.name,projects."startDate",projects."endDate",projects.description,projects.technologies,
        projects.image,projects."createdAt",projects."updatedAt",users.name 
        AS author FROM projects LEFT JOIN users ON projects.author_id = users.id WHERE projects.id=${id}`
        const data = await sequelize.query(query,{type: QueryTypes.SELECT})
        console.log(data)
        res.render('project',{data:data[0]})
    }

    

}
async function updateBlog(req,res) {
    const isLogin = req.session.isLogin
    const id = req.params.id 
    if(!isLogin){
        res.render('login')
    } else {
        const query = `SELECT *from projects WHERE id=${id}`
        const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
        res.render('updateProject',{data:obj[0]})
    }


}

async function update(req,res){

        const id = req.body.id
        const name = req.body.inputName 
        const startDate = req.body.startDate 
        const endDate = req.body.endDate 
        const description = req.body.description
        const technologies = req.body.checkbox
        const image = req.file.filename
        
        const query = `UPDATE projects SET name='${name}', "startDate"='${startDate}', "endDate"='${endDate}', description='${description}',technologies='{${technologies}}',image='${image}'
        WHERE id='${id}'`
        const obj = await sequelize.query(query,{ type: QueryTypes.UPDATE })
        res.redirect('/')
    
}

async function prosesProject(req,res){
    
    const name = req.body.inputName 
    const startDate = req.body.startDate 
    const endDate = req.body.endDate 
    const description = req.body.description
    const technologies = req.body.checkbox
    const image = req.file.filename;
    const id = req.session.user.id
    
    const query = `INSERT INTO projects(name,"startDate","endDate",description,technologies,image,author_id) 
    VALUES ('${name}','${startDate}','${endDate}','${description}','{${technologies}}','${image}','${id}')`
    const obj = await sequelize.query(query,{ type: QueryTypes.INSERT })


    console.log("ini image",obj)

   
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
        req.flash('denger', "your Account not Found!!")//pengecekan di data email
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
        req.session.id = obj[0].id
        req.session.user = {
            id: obj[0].id,
            name : obj[0].name,
            email: obj[0].email
        }
        res.redirect('/')
        
    })

    // res.redirect('login')
}
function logout(req,res){
    req.session.destroy(err => {
        if (err) {
          console.error(err);
        } else {
        //   res.clearCookie('connect.sid'); // Menghapus cookie session
          res.redirect('/login');
        }
      });

}

app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})