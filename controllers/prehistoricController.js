const express = require('express')
const router = express.Router()
// const methodOverride = require('method-override')
const fs = require('fs')
module.exports = router



router.get('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)

    let nameFilter = req.query.nameFilter

    if (nameFilter){
        creatureData = creatureData.filter(creature=>{
            return creature.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('prehistoric/index.ejs',{myCreatures: creatureData})
})

router.get('/new',(req,res)=>{
    res.render('prehistoric/new.ejs')
})

router.get('/edit/:idx', (req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
    res.render('prehistoric/edit.ejs',{creature: targetCreature, creatureId: creatureIndex})
})

//PUT route 
router.put('/:idx',(req,res)=>{
    //read in our existing dino data
    let creatures = fs.readFileSync("./prehistoric-creatures.json")
    let creatureData = JSON.parse(creatures)
    //replace dino fields with fiels from form
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url
    //write the updated array back to json
    fs.writeFileSync('./prehistoric-creatures.json',JSON.stringify(creatureData))
    // once the dinosaur has been editted, get request to the route
    res.redirect('/prehistoric_creatures')
})

router.get('/:idx',(req,res)=>{
    // 11. read in json file - extract dino corresponding to id 
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
    res.render ('prehistoric/show.ejs',{creature: targetCreature})
})

router.post('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    // add new dino to dinoData array
    creatureData.push(req.body)
    //save the dinos to the json file
    fs.writeFileSync('./prehistoric-creatures.json',JSON.stringify(creatureData))
    //redirect back to index route -  takes url pattern for the GET route you wanna run next
    res.redirect('/prehistoric_creatures')
})


router.delete('/:idx',(req,res)=>{
    //read in our files from json
    let creatures = fs.readFileSync("./prehistoric-creatures.json")
    let creatureData = JSON.parse(creatures)
    //remove the deleted dino from dinoData
    creatureData.splice(req.params.idx, 1)
    //rewrite the file
    fs.writeFileSync('./prehistoric-creatures.json',JSON.stringify(creatureData))
    //redirect to index route
    res.redirect('/prehistoric_creatures')
})