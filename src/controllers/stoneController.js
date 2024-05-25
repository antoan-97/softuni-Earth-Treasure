const router = require('express').Router();

router.get('/', async (req,res) =>{
    const photos = await stoneManager.getAll().lean();
    res.render('stones')
});

router.get('/create' , (req,res) =>{
    res.render('stones/create')
});



module.exports = router;