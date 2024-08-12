const express = require('express');
const router = express.Router();
const { getBanner, updateBanner, getAllBanners, createBanner, deleteBanner } = require('./controllers');

router.get('/banner', getAllBanners);
router.get('/banner/:id', getBanner);
router.put('/banner/update/:id', updateBanner);
router.post('/banner/create', createBanner);
router.delete('/banner/delete/:id', deleteBanner);

module.exports = router;
