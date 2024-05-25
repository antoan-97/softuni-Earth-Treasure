const router = require('express').Router();

router.get('/', (req,res) =>{
    res.render('stones')
});

router.get('/create' , (req,res) =>{
    res.render('stones/create')
});



module.exports = router;