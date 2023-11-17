const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static('public'));

router.get('/', (req, res) => {
    res.sendFile(path.join("./public", 'index.html'));
});

module.exports = router;