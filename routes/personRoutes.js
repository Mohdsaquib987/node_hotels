const express=require('express');
const router=express.Router();
const person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new person(data);
        const response = await newPerson.save();
        res.status(201).json(response);

        console.log("data saved");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetched");
        res.status(201).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/:worktype',async(req,res)=>{
    try{
        const worktype=req.params.worktype; //extarct the work type from url parameter
    if(worktype=='chef' || worktype=='manager' || worktype=='waiter'){
        const response = await person.find({work:worktype});
        console.log("response fetched");
        res.status(200).json(response);
    }
    else{
        res.status(404).json({ error: "Invalid work type" });
    }
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedPersonData=req.body;

        const response=await person.findByIdAndUpdate(personid,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports=router;