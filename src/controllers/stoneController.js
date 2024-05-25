const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelper');

const stoneManager = require('../managers/stoneManager');

router.get('/', async (req, res) => {
    const stones = await stoneManager.getAll().lean();
    res.render('stones', { stones })
});

router.get('/create', (req, res) => {
    res.render('stones/create')
});


router.post('/create', async (req, res) => {
    const stoneData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await stoneManager.create(stoneData);
        res.redirect('/stones')
    } catch (err) {
        res.render('stones/create', { error: getErrorMessage(err) })
    }
});

router.get('/:stoneId/details', async (req, res) => {

    const { user } = req;
    const stoneId = req.params.stoneId;

    const stone = await stoneManager.getOne(stoneId).lean();
    const isOwner = req.user?._id == stone.owner?._id
    const hasLiked = stone.voteList?.some((v) => v?.toString() === user?._id);

    res.render('stones/details', { stone, isOwner, hasLiked });
});



module.exports = router;