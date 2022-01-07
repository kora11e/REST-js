const express = require('express');
const router = express.Router()
const fetchController = require('./controllers/fetch-controller')

router.get('/fetched', fetchController.fetchData)

module.exports = router