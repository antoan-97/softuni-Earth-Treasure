const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const stoneController = require('./controllers/stoneController');



router.use(homeController);
router.use('/users',userController);
router.use('/stones', stoneController);
router.get('*', (req,res) =>{
    res.redirect('/404')
});



module.exports = router