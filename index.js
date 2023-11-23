const express = require( 'express' )
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'views'))

app.use("/assets",express.static('assets'))
app.use(express.urlencoded({extended: false}))

app.get('/home',home)
app.get('/project',project)
app.get('/project-detail/:id',detail)
app.get('/contact-me',contact)
app.get('/testimonial', testimonial)
app.get('/detail-card',detailCard)

app.post('/project',prosesProject)


function home(req,res){

    const data = {
        id: "1",
        title: "eleh",
        content: "wkwkwkwkwkw"
    }
    res.render('index', {data})
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
function detail(req,res){
    const title = req.params.id
    const data = {
        id: "1",
        title: "eleh",
        content: "wkwkwkwkwkw"
    }
    res.render('detail-project',{data})
}

function detailCard(req,res) {
    res.render('project')
}
function prosesProject(req,res){
    const title = req.body.inputName
    const description = req.body.description

    
    console.log(title)
    console.log(description)
    res.render('index')
}

app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})