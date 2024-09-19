const router = require('express').Router();
const openAiController = require('../controllers/opencontroller');
router.post('/generate-questions', openAiController.firstResponse);
module.exports = router;