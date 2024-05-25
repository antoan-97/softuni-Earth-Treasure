const router = require('express').Router();

router.get('/create' , (req,res) =>{
    res.render('stones/create')
})


module.exports = router;