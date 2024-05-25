const Stones = require('../models/Stones');

const router = require('express').Router();

router.get('/', async (req,res) =>{
    const stones = await Stones.find()
    res.render('home', { stones });
});

router.get('/404', (req,res) =>{
    res.render('404');
})

module.exports = router;