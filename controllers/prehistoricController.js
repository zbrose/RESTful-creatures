const express = require('express')
const router = express.Router()
// const methodOverride = require('method-override')
const fs = require('fs')
module.exports = router

router.get('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric/index.ejs',{myCreatures: creatureData})
})

router.get('/new',(req,res)=>{
    res.render('prehistoric/new.ejs')
})


router.get('/:id',(req,res)=>{
    // 11. read in json file - extract dino corresponding to id 
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.id
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