const express = require('express');
const router = express.Router();

const menuItems = require('./../models/menuItems');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newitems = new menuItems(data);
        const response = await newitems.save();
        res.status(201).json(response);
        console.log("data saved");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; 

        const response = await menuItems.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updateMenudata=req.body;

        const response = await menuItems.findByIdAndUpdate(menuId, updateMenudata, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})


router.get('/:taste', async (req, res) => {
    try {
        const tastetype = req.params.taste;
        if (tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour') {
            const response = await menuItems.find({ taste: tastetype });
            console.log("response fetched");
            res.status(201).json(response)
        } else {
            res.status(404).json({ error: "Invalid taste type" });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await menuItems.find();
        console.log("data fetched");
        res.status(201).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//comment added

module.exports = router;