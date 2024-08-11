const express = require('express');
const router = express.Router();
const { getBanner, updateBanner } = require('./controllers');

router.get('/banner/:id', getBanner);
router.post('/banner/update/:id', updateBanner);

module.exports = router;
