// 1. hook this stuff up
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
// 9. do this file system module
const fs = require('fs')


// 2. create instance of express
const app = express()


// 3. hook up MIDDLEWARE
app.set('view engine','ejs')
// 4. tell express were using ejs layouts
app.use(ejsLayouts)
// 15. body-parser middle ware
//allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))


//ROUTES
// 5. set home route
app.get('/',(req,res)=>{
    res.send('dinos here')
})

// 8. create index route to list all dinos
app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    res.render("index.ejs", { myDinos: dinoData })
});

//13. new route
app.get('/dinosaurs/new',(req,res)=>{
    res.render('new.ejs')
})

//10 .show all info about a single dino
// colon indicates the following is a url param
app.get('/dinosaurs/:idx',(req,res)=>{
    // 11. read in json file - extract dino corresponding to id 
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render ('show.ejs',{dino: targetDino})
})

//14. post a dino
app.post('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // add new dino to dinoData array
    dinoData.push(req.body)
    //save the dinos to the json file
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect back to index route -  takes url pattern for the GET route you wanna run next
    res.redirect('/dinosaurs')
})

// 6. get a port to listen to 
app.listen(8000, ()=>{
    console.log('IM LISTENING')
})

// 7. run nodemon and check at host site 