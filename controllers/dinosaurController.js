const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router()
// const methodOverride = require('method-override')
const fs = require('fs')

module.exports = router

router.get("/", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter

    if (nameFilter){
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render("dinosaurs/index.ejs", { myDinos: dinoData })
});


router.get('/new',(req,res)=>{
    res.render('dinosaurs/new.ejs')
})

router.get('/edit/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs',{dino: targetDino, dinoId: dinoIndex})
})

//PUT route 
router.put('/:idx',(req,res)=>{
    //read in our existing dino data
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //replace dino fields with fiels from form
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    //write the updated array back to json
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    // once the dinosaur has been editted, get request to the route
    res.redirect('/dinosaurs')
})

//10 .show all info about a single dino
// colon indicates the following is a url param
router.get('/:idx',(req,res)=>{
    // 11. read in json file - extract dino corresponding to id 
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render ('dinosaurs/show.ejs',{dino: targetDino})
})

//14. post a dino   
router.post('/',(req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // add new dino to dinoData array
    dinoData.push(req.body)
    //save the dinos to the json file
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect back to index route -  takes url pattern for the GET route you wanna run next
    res.redirect('/dinosaurs')
})

router.delete('/:idx',(req,res)=>{
    //read in our files from json
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //remove the deleted dino from dinoData
    dinoData.splice(req.params.idx, 1)
    //rewrite the file
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    //redirect to index route
    res.redirect('/dinosaurs')
})