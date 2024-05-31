const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

const stoneManager = require('../managers/stoneManager');

router.get('/', async (req, res) => {
    const stones = await stoneManager.getAll().lean();
    res.render('stones', { stones })
});

router.get('/create', isAuth, (req, res) => {
    try {
        res.render('stones/create')  
    } catch (err) {
        res.render('404');
    }
});


router.post('/create', isAuth, async (req, res) => {
    const stoneData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await stoneManager.create(stoneData);
        res.redirect('/stones')
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});

router.get('/:stoneId/details', async (req, res) => {

    const { user } = req;
    const stoneId = req.params.stoneId;

    const stone = await stoneManager.getOne(stoneId).lean();
    const isOwner = req.user?._id == stone.owner?._id
    const hasLiked = stone.likedList?.some((v) => v?.toString() === user?._id);

    res.render('stones/details', { stone, isOwner, hasLiked });
});

router.get('/:stoneId/edit', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;

    try {
        const stone = await stoneManager.getOne(stoneId).lean();
        res.render('stones/edit', { stone });
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }

});

router.post('/:stoneId/edit', isAuth, async (req, res) => {

    const stoneId = req.params.stoneId;
    const stoneData = req.body;

    try {
        await stoneManager.edit(stoneId, stoneData);
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        res.render('stones/edit', { stone: { ...stoneData, _id: stoneId },  error: getErrorMessage(err) });
    }
})

router.get('/:stoneId/delete', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;

    try {
        await stoneManager.delete(stoneId);
        res.redirect('/stones');
    } catch (err) {
        res.render('photos/details', { error: getErrorMessage(err) });
    }
});


router.get('/:stoneId/like', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const userId = req.user._id;

    try {
        await stoneManager.like(stoneId, userId);
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

router.get('/search', async (req, res) => {
    const { name } = req.query;

    let query = {};
    if (name) {
        query.name = new RegExp(`^${name}$`, 'i'); // Case-insensitive full match
    }

    try {
        const results = await stoneManager.search(query);
        res.render('partials/search', { results }); // Render the 'search.hbs' template
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});



module.exports = router;